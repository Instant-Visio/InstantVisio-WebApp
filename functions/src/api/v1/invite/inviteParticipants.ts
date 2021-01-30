import { wrap } from 'async-middleware'
import { Request, Response } from 'express'
import {
    BadRequestError,
    NoNotificationSentError,
} from '../../errors/HttpError'
import { assertRightToEditRoom } from '../../../db/assertRightsToEditRoom'
import { InvitationDestination } from '../../../types/InvitationDestination'
import {
    NotificationContent,
    NotificationFormatType,
} from '../../../types/Notification'
import { sendNotifications } from '../../../notifications/sendNotifications'
import { UID } from '../../../types/uid'
import { isDestinationsCorrectlyFormatted } from '../utils/isDestinationsCorrectlyFormatted'
import { UserDao } from '../../../db/UserDao'
import { increment } from '../../../firebase/firebase'
import { RoomId } from '../../../types/Room'
import { JSONParse } from '../utils/JSONParse'
import { formatRoomUrl } from '../../../db/RoomDao'

/**
 * @swagger
 * /v1/rooms/{roomId}/inviteParticipants:
 *   post:
 *     description: Send an invitation to one or many participants, via email and/or sms and/or push notification with a given groupId. It can combine all notification types, as well as specific lang for each participants. <br/> Default lang is "fr". <br/> Available languages are en, fr, de, es, gr (el), hu, it, ro. <br/> Country are defaulted to "fr" if not supplied, it improves the phone umber parsing success rate, though it is already good by default (it use libphonenumber-js). <br/> Email and phone numbers are not saved in InstantVisio databases, not logged. Phone number are stored for a maximum of 24 hours on OVH Telecom (CRON run to clear them up every 12h), while emails logs are kept on SendGrid (email) without being able to erase those logs.
 *     tags:
 *       - rooms
 *     consumes:
 *     - multipart/form-data
 *     produces:
 *     - application/json
 *     parameters:
 *       - name: hostname
 *         description: The name or organisation which sent the invite(s)
 *         in: x-www-form-urlencoded
 *         required: true
 *         type: string
 *       - name: destinations
 *         description: An array of destinations
 *         in: x-www-form-urlencoded
 *         required: true
 *         examples:
 *            mixed:
 *                summary: Mixed email, sms, groupId and languages
 *                $ref: '#/components/examples/Destinations'
 *         schema:
 *            type: string
 *     responses:
 *       200:
 *         description: One or many invites were sent successfully. It will return a 2xx if some invitation where not able to be sent (malformed email or phone number for eg).
 *         content:
 *           application/json:
 *             schema:
 *               example: {
 *                   emailsSent: ["participant@example.com", "anotherParticipant@example.com"],
 *                   smssSent: ["+33600000000"],
 *                   pushsSent: ["groupId"],
 *               }
 *       400:
 *         description: request content (x-www-form-urlencoded) not correct, or zero invitation delivered
 *       401:
 *         description: missing authorization bearer token
 *       403:
 *         description: invalid authorization header
 *       404:
 *         description: room does not exist
 *       412:
 *         description: authorization header wrong format
 */
export const inviteParticipantsRoute = wrap(
    async (req: Request, res: Response) => {
        const roomId = req.params.roomId
        const userId: UID = res.locals.uid
        const { hostName, destinations } = req.body

        const invitationsSent = await inviteParticipant({
            roomId,
            userId,
            hostName,
            destinations,
        })

        res.send(invitationsSent)
    }
)

export const inviteParticipant = async ({
    roomId,
    userId,
    hostName,
    destinations,
}: {
    roomId: RoomId
    userId: UID
    hostName: string
    destinations: string
}): Promise<InviteParticipantsResponse> => {
    const room = await assertRightToEditRoom(roomId, userId)
    const destinationArray = <InvitationDestination[]>JSONParse(destinations)

    if (!hostName || !isDestinationsCorrectlyFormatted(destinationArray)) {
        throw new BadRequestError('Request body not formatted correctly')
    }

    const invitationsDestinations: InvitationDestination[] = destinationArray.map(
        (dest) => {
            const lang = dest.lang || 'fr'
            const country = dest.country || 'fr'
            return {
                ...dest,
                lang,
                country,
            }
        }
    )

    const notificationContent: NotificationContent = {
        name: hostName,
        roomUrl: formatRoomUrl(room.id, room.password),
        format: NotificationFormatType.Now,
        timezone: room.timezone,
    }

    const { emailsSent, smssSent, pushsSent } = await sendNotifications(
        invitationsDestinations,
        notificationContent,
        roomId
    )

    if (
        emailsSent.length === 0 &&
        smssSent.length === 0 &&
        pushsSent.length === 0
    ) {
        throw new NoNotificationSentError()
    }

    await UserDao.updateUsage(userId, {
        sentSMSs: increment(smssSent.length),
        sentEmails: increment(emailsSent.length),
        sentPushs: increment(pushsSent.length),
    })

    return {
        emailsSent,
        smssSent,
        pushsSent,
    }
}

export interface InviteParticipantsResponse {
    emailsSent: string[]
    smssSent: string[]
    pushsSent: string[]
}
