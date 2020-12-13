import { Request, Response } from 'express'
import { wrap } from 'async-middleware'
import { assertRightToEditRoom } from '../../../db/assertRightsToEditRoom'
import { BadRequestError } from '../../errors/HttpError'
import { isDestinationsCorrectlyFormatted } from '../utils/isDestinationsCorrectlyFormatted'
import { addReminderDb } from '../../../db/remindersDb'

/**
 * @swagger
 * /v1/rooms/{roomId}/reminders/:
 *   post:
 *     description: Create a new reminder. A reminder is composed of a send timestamp as well as multiple destination(s) (sms and/or emails).
 *     tags:
 *       - rooms
 *     consumes:
 *     - multipart/form-data
 *     produces:
 *     - application/json
 *     parameters:
 *       - name: sendTimestamp
 *         description: The UTC timestamp in seconds at which the reminder is scheduled to be sent.
 *         in: x-www-form-urlencoded
 *         required: true
 *         type: integer
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
 *         type: array
 *         items:
 *            $ref: '#/components/schemas/Destination'
 *     responses:
 *       201:
 *         description: Reminder created with success
 *         content:
 *           application/json:
 *             schema:
 *               example: {
 *                   reminderId: "aZxo2xskIaZxo2xskI",
 *               }
 *       400:
 *         request content (x-www-form-urlencoded) not correct
 *       401:
 *         description: missing authorization bearer token
 *       403:
 *         description: authorization header present but not valid
 *       412:
 *         description: authorization header present but not formatted correctly
 */
export const newReminder = wrap(async (req: Request, res: Response) => {
    const userId = res.locals.uid
    const roomId = req.params.roomId
    await assertRightToEditRoom(roomId, userId)

    const body = req.body
    const sendTimestamp = parseInt(body.sendTimestamp)
    const destinations = JSON.parse(body.destinations || '[]')

    if (!sendTimestamp || !isDestinationsCorrectlyFormatted(destinations)) {
        throw new BadRequestError('Request body not formatted correctly')
    }

    const currentTime = Date.now() / 1000
    if (currentTime > sendTimestamp) {
        throw new BadRequestError('Request sendTimestamp is in the past')
    }

    const reminderId = await addReminderDb(roomId, sendTimestamp, destinations)

    res.send({
        reminderId,
    })
})
