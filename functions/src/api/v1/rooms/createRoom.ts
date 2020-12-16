import { Request, Response } from 'express'
import { createTwilioRoom } from './service/createTwilioRoom'
import { NewRoomResponse } from '../../../types/NewRoomResponse'
import { wrap } from 'async-middleware'
import { UID } from '../../../types/uid'
import { assertNewRoomCreationGranted } from '../subscription/assertNewRoomCreationGranted'
import { RoomId } from '../../../types/Room'
import { Timestamp } from '../../../firebase/firebase'
import { RoomDao } from '../../../db/RoomDao'
import { ReminderId } from '../../../types/Reminder'
import { createReminder } from '../reminders/createReminderRoute'
import {
    inviteParticipant,
    InviteParticipantsResponse,
} from '../invite/inviteParticipantsRoute'

/**
 * @swagger
 * /v1/rooms/new:
 *   post:
 *     description: Create a new room. This will generate a random room id (9 random a-Z 0-9 chat) and a random password if none provided. The room will have an infinite lifetime though it will probably change in the future. <br/><br/>To schedule a room, use this route and set the startTimestamp field, it will not prevent the meeting to start before of after and will be used to fill the date on the UI & reminders.
 *     tags:
 *       - rooms
 *     consumes:
 *     - multipart/form-data
 *     produces:
 *     - application/json
 *     parameters:
 *       - name: password
 *         description: (optional) The room password. If no password, a random one will be generated.
 *         in: x-www-form-urlencoded
 *         required: false
 *         type: string
 *       - name: name
 *         description: (optional) The room name. If not supplied, the roomName will be the room id.
 *         in: x-www-form-urlencoded
 *         required: false
 *         type: string
 *       - name: startAt
 *         description: (optional) The UTC timestamp in seconds at which the meeting is scheduled to start. If not set, it will be the current time.
 *         in: x-www-form-urlencoded
 *         required: false
 *         type: integer
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
 *     responses:
 *       201:
 *         description: Room created with success. Depending of the parameters, will either have a list of created reminders ids OR the emails & SMSs sent list.
 *         content:
 *           application/json:
 *             schema:
 *               example: {
 *                   roomSid: "aZxo2xskIaZxo2xskI",
 *                   roomId: "390FJZDms390FJZDms",
 *                   remindersIds: ["dza5cv8zzDAza882"],
 *                   emailsSent: ["hi@example.com"],
 *                   smssSent: ["+3300000000"]
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
}: {
    userId: UID
    roomRequestedPassword?: string
    specificRoomId?: RoomId
    startAt?: string
    name?: string
    hostName?: string
    destinations?: string
    sendsAt?: string
}): Promise<NewRoomResponse> => {
    await assertNewRoomCreationGranted(userId)

    let roomId: RoomId
    const roomPassword =
        roomRequestedPassword || `${~~(Math.random() * 999999)}`
    const roomStartAt = Timestamp.fromMillis(
        startAt ? parseInt(startAt) * 1000 : ~~(Date.now() / 1000)
    )

    if (specificRoomId) {
        roomId = await RoomDao.set(
            userId,
            specificRoomId,
            roomPassword,
            roomStartAt
        )
    } else {
        roomId = await RoomDao.add(userId, roomPassword, roomStartAt)
    }

    const roomSid = await createTwilioRoom(roomId)
    await RoomDao.update({
        roomId,
        roomSid,
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
        roomSid,
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
                sendAtParameter: sendAt,
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
        destinationsParameter: destinations,
    })
}

type ProcessDestinationsResponse =
    | InviteParticipantsResponse
    | {
          reminderIds: ReminderId[]
      }

const parseSendsAt = (sendsAt: string): string[] => {
    return Array.isArray(sendsAt) ? sendsAt : JSON.parse(sendsAt)
}
