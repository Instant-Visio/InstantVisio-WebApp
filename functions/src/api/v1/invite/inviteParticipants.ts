import { wrap } from 'async-middleware'
import { Request, Response } from 'express'
import { BadRequestError } from '../../errors/HttpError'
import { assertRightToEditRoom } from '../../../db/assertRightsToEditRoom'
import { InvitationDestination } from '../../../types/InvitationDestination'
import { getAppEnv } from '../../../firebase/env'
import { NotificationContent } from '../../../types/Notification'
import { sendNotifications } from '../../../notifications/sendNotifications'
import { UID } from '../../../../../types/uid'

/**
 * @swagger
 * /v1/rooms/{roomId}/inviteParticipants:
 *   post:
 *     description: Send an invitation to one or many participants, via email and/or sms. It can combine email and sms destinations, as well as specific lang for each participants. Email & phone can be used at the same time, email will be sent first. <br/> Default lang is "en". <br/> Available languages are en, fr, de, es, gr (el), hu, it, ro. <br/> Country are defaulted to "fr" if not supplied, it improve the phone umber parsing success rate, though it is already good by default (it use libphonenumber-js). <br/> Email and phone numbers are not saved in InstantVisio databases, not logged. Phone number are stored for a maximum of 24 hours on OVH Telecom (CRON run to clear them up every 12h), while emails logs are kept on SendGrid (email) without being able to erase those logs.
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
 *            mixedTypeAndLang:
 *                summary: Mixed email, sms and languages
 *                value: [{email: "user@example.com", lang: "en"}, {phone: "+33600000000", lang:"fr"}, {phone: "+33600000000", lang:"fr", country:"en"}]
 *            emailInvite:
 *                summary: One email invite with French lang
 *                value: [{email: "user@example.com", lang: "fr"}]
 *         schema:
 *            type: array
 *            items:
 *                type: object
 *                properties:
 *                   email:
 *                       type: string
 *                   phone:
 *                       type: string
 *                   lang:
 *                       type: string
 *                       default: en
 *                       enum:
 *                           - en
 *                           - fr
 *                           - de
 *                           - es
 *                           - gr
 *                           - hu
 *                           - it
 *                           - ro
 *
 *     responses:
 *       200:
 *         description: One or many invites were sent successfully. It will return a 2xx if some invitation where not able to be sent (malformed email or phone number for eg).
 *         content:
 *           application/json:
 *             schema:
 *               example: {
 *                   emailsSent: ["participant@example.com", "anotherParticipant@example.com"],
 *                   smssSent: ["+33600000000"],
 *               }
 *       400:
 *         description: request content (x-www-form-urlencoded) not correct, or zero invitation delivered
 *       401:
 *         description: missing authorization bearer token
 *       403:
 *         description: token not valid
 *       404:
 *         description: room does not exist
 *       412:
 *         description: authorization header present but not formatted correctly
 */
export const inviteParticipants = wrap(async (req: Request, res: Response) => {
    const roomId = req.params.roomId
    const userId: UID = res.locals.uid
    const room = await assertRightToEditRoom(roomId, userId)

    const {
        body: { hostname, destinations },
    } = req.body

    if (
        !hostname ||
        !destinations ||
        !Array.isArray(destinations) ||
        destinations.length === 0
    ) {
        throw new BadRequestError('Request content not formatted correctly')
    }

    const invitationsDestinations: InvitationDestination[] = destinations.map(
        (dest) => {
            const lang = dest.lang || 'en'
            const country = dest.country || 'fr'
            return {
                ...dest,
                lang,
                country,
            }
        }
    )

    // TODO: aggregate the notification sent count by user

    const appEnv = getAppEnv()

    const roomUrl = `https://${appEnv.domain}/room/${roomId}?pwd=${room.password}`

    const notificationContent: NotificationContent = {
        name: hostname,
        roomUrl: roomUrl,
    }

    const { emailsSent, smssSent } = await sendNotifications(
        invitationsDestinations,
        notificationContent
    )

    if (emailsSent.length === 0 && smssSent.length === 0) {
        throw new BadRequestError('No emails or SMS delivered')
    }

    res.send({
        emailsSent: emailsSent,
        smssSent: smssSent,
    })
})
