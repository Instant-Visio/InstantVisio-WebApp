import { Request, Response } from 'express'
import { wrap } from 'async-middleware'
import { assertRightToEditRoom } from '../../../db/assertRightsToEditRoom'
import {
    ReminderEditData,
    updateReminderDb,
    getReminderDb,
} from '../../../db/remindersDb'
import { isDestinationsCorrectlyFormatted } from '../utils/isDestinationsCorrectlyFormatted'
import { BadRequestError } from '../../errors/HttpError'
import { Timestamp } from '../../../firebase/firebase'
import { assertTimestampInFuture } from './assertTimestampInFuture'

/**
 * @swagger
 * /v1/rooms/{roomId}/reminders/{reminderId}:
 *   patch:
 *     description: Update an existing reminder, either to change the destinations (all at once, replacing them) or the datetime at which it will be sent.
 *     tags:
 *       - rooms
 *     consumes:
 *     - multipart/form-data
 *     produces:
 *     - application/json
 *     parameters:
 *       - name: hostName
 *         description: The name or organisation which sent the invite(s)
 *         in: x-www-form-urlencoded
 *         required: true
 *         type: string
 *       - name: sendAt
 *         description: (optional) The UTC timestamp in seconds at which the reminder is scheduled to be sent.
 *         in: x-www-form-urlencoded
 *         required: false
 *         type: integer
 *       - name: destinations
 *         description: (optional) An array of destinations
 *         in: x-www-form-urlencoded
 *         required: false
 *         examples:
 *            mixed:
 *                summary: Mixed email, sms and languages
 *                $ref: '#/components/examples/Destinations'
 *         type: string
 *         items:
 *            $ref: '#/components/schemas/Destination'
 *     responses:
 *       204:
 *         description: Reminder updated with success
 *         content:
 *           application/json:
 *             example: {
 *               reminders: {
 *                 id: 'vXIUuaGkH4kukbwRH5cU',
 *                 createdAt: 1605969562,
 *                 updatedAt: 1605969562,
 *                 destinations: [],
 *                 hostName: "MaSuperAsso",
 *                 sendAt: 1605969562,
 *                 isSent: false
 *               }
 *             }
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/Reminder'
 *       400:
 *         description: request content (x-www-form-urlencoded) not correct
 *       401:
 *         description: missing authorization bearer token
 *       403:
 *         description: authorization header present but not valid
 *       412:
 *         description: authorization header present but not formatted correctly
 */
export const editReminder = wrap(async (req: Request, res: Response) => {
    const userId = res.locals.uid
    const { roomId, reminderId } = req.params
    await assertRightToEditRoom(roomId, userId)

    const dataToEdit: ReminderEditData = {
        reminderId,
    }

    const { destinations, hostName, sendAt } = req.body
    if (destinations) {
        const parsedDestinations = JSON.parse(destinations)
        if (isDestinationsCorrectlyFormatted(parsedDestinations)) {
            dataToEdit['destinations'] = parsedDestinations
        } else {
            throw new BadRequestError('Request body not formatted correctly')
        }
    }
    if (sendAt) {
        const sendAtTs = Timestamp.fromMillis(parseInt(sendAt) * 1000)
        assertTimestampInFuture(sendAtTs)
        dataToEdit['sendAt'] = sendAtTs
    }
    if (hostName) {
        dataToEdit['hostName'] = hostName
    }

    await updateReminderDb(dataToEdit)

    const reminder = await getReminderDb(reminderId)

    res.send({
        reminder,
    })
})
