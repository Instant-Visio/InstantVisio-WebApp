import { Request, Response } from 'express'
import { createTwilioRoom } from './service/createTwilioRoom'
import { NewRoomResponse } from '../../../types/NewRoomResponse'
import { wrap } from 'async-middleware'
import { UID } from '../../../types/uid'
import { assertNewResourceCreationGranted } from '../subscription/assertNewResourceCreationGranted'
import { RoomId } from '../../../types/Room'
import { Timestamp } from '../../../firebase/firebase'
import { RoomDao } from '../../../db/RoomDao'
import { ReminderId } from '../../../types/Reminder'
import { createReminder } from '../reminders/createReminder'
import {
    inviteParticipant,
    InviteParticipantsResponse,
} from '../invite/inviteParticipants'
import { JSONParse } from '../utils/JSONParse'

/**
 * @swagger
 * /v1/rooms/new:
 *   post:
 *     description: Create a new room. This will generate a random room id (9 random a-Z 0-9 chat) and a random password if none provided. The room will have a 24 hours lifetime after its startAt time (if not supplied, the creation time). <br/><br/>To schedule a room, use this route and set the startTimestamp field, it will not prevent the meeting to start before or after and will be used to fill the date on the UI & reminders. <br/><br/>This route also allows sending invitation to join it right away or setup reminders for the future. For this, always supply hostName & destinations, and use sendsAt only for reminders. This route will either send invitation or schedule reminder, not both.
 *     tags:
 *       - rooms
 *     consumes:
 *     - multipart/form-data
 *     produces:
 *     - application/json
 *     parameters:
 *       - $ref: '#/components/parameters/room/password'
 *       - $ref: '#/components/parameters/room/name'
 *       - $ref: '#/components/parameters/room/startAt'
 *       - name: destinations
 *         description: An array of destinations
 *         in: x-www-form-urlencoded
 *         required: false
 *         examples:
 *            mixed:
 *                summary: Mixed email, sms and languages
 *                $ref: '#/components/examples/Destinations'
 *         schema:
 *            type: string
 *         items:
 *            $ref: '#/components/schemas/Destination'
 *       - name: hostName
 *         description: The name or organisation which sent the invite(s)
 *         in: x-www-form-urlencoded
 *         required: false
 *         type: string
 *       - name: sendsAt
 *         description: An array of UTC timestamp(s) in seconds at which the reminder(s) are scheduled to be sent. If not supplied, the invitation will be sent upon request process, otherwise reminders will be created.
 *         in: x-www-form-urlencoded
 *         required: false
 *         type: string
 *         examples:
 *            mixed:
 *                summary: Multiple sendAt dates
 *                value: '[1708118298, 1808118298]'
 *       - $ref: '#/components/parameters/room/hideChatbot'
 *     responses:
 *       201:
 *         description: Room created with success. Depending on the parameters, it will either be a list of created reminders ids OR the emails & SMSs sent list.
 *         content:
 *           application/json:
 *             schema:
 *               example: {
 *                   roomSid: "aZxo2xskIaZxo2xskI",
 *                   roomId: "390FJZDms390FJZDms",
 *                   remindersIds: ["dza5cv8zzDAza882"],
 *                   emailsSent: ["hi@example.com"],
 *                   smssSent: ["+3300000000"],
 *                   pushsSent: ["groupId"]
 *               }
 *       400:
 *         description: unable to add a reminder before the current time (in the past)
 *       401:
 *         description: missing authorization bearer token
 *       403:
 *         description: invalid authorization header
 *       412:
 *         description: authorization header wrong format
 */
export const createRoomRoute = wrap(async (req: Request, res: Response) => {
    const newRoomResponse = await createRoom({
        userId: res.locals.uid,
        roomRequestedPassword: req.body.password,
        startAt: req.body.startAt,
        hideChatbot: req.body.hideChatbot === 'true',
        name: req.body.name,
        hostName: req.body.hostName,
        destinations: req.body.destinations,
        sendsAt: req.body.sendsAt,
    })
    res.send(newRoomResponse)
})

export const createRoom = async ({
    userId,
    roomRequestedPassword,
    specificRoomId,
    startAt,
    name,
    hostName,
    destinations,
    sendsAt,
    hideChatbot = false,
}: {
    userId: UID
    hideChatbot?: boolean
    roomRequestedPassword?: string
    specificRoomId?: RoomId
    startAt?: string
    name?: string
    hostName?: string
    destinations?: string
    sendsAt?: string
}): Promise<NewRoomResponse> => {
    await assertNewResourceCreationGranted(userId)

    let roomId: RoomId
    const roomPassword =
        roomRequestedPassword || `${~~(Math.random() * 999999)}`
    const roomStartAt = Timestamp.fromMillis(
        startAt ? +startAt * 1000 : Date.now()
    )

    if (specificRoomId) {
        roomId = await RoomDao.set(
            userId,
            specificRoomId,
            roomPassword,
            roomStartAt,
            hideChatbot
        )
    } else {
        roomId = await RoomDao.add(
            userId,
            roomPassword,
            roomStartAt,
            hideChatbot
        )
    }

    const twilioRoomResponse = await createTwilioRoom(roomId)
    await RoomDao.update({
        id: roomId,
        sid: twilioRoomResponse.sid,
        twilioRoomId: twilioRoomResponse.twilioRoomId,
        name: name || roomId,
    })

    let processDestinationsResults = {}
    if (hostName && destinations) {
        processDestinationsResults = await processDestinations(
            roomId,
            userId,
            hostName,
            destinations,
            sendsAt
        )
    }

    return {
        roomId,
        roomSid: twilioRoomResponse.sid,
        ...processDestinationsResults,
    }
}

const processDestinations = async (
    roomId: RoomId,
    userId: UID,
    hostName: string,
    destinations: string,
    sendsAt?: string
): Promise<ProcessDestinationsResponse> => {
    if (sendsAt) {
        const sendsAtValues = parseSendsAt(sendsAt)
        const reminderIds: ReminderId[] = []
        for (const sendAt of sendsAtValues) {
            const id = await createReminder({
                roomId,
                userId,
                sendAtSeconds: sendAt,
                hostName,
                destinationsParameter: destinations,
            })
            reminderIds.push(id)
        }
        return {
            reminderIds,
        }
    }

    return inviteParticipant({
        roomId,
        userId,
        hostName,
        destinations,
    })
}

type ProcessDestinationsResponse =
    | InviteParticipantsResponse
    | {
          reminderIds: ReminderId[]
      }

const parseSendsAt = (sendsAt: string | Array<string>): string[] => {
    return Array.isArray(sendsAt) ? sendsAt : JSONParse(sendsAt)
}
