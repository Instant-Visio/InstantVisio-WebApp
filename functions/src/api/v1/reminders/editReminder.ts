import { Request, Response } from 'express'
import { wrap } from 'async-middleware'
import { assertRightToEditRoom } from '../../../db/assertRightsToEditRoom'
import { ReminderEditData, ReminderDao } from '../../../db/ReminderDao'
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
 *       - name: sendAt
 *         description: (optional) The UTC timestamp in seconds at which the reminder is scheduled to be sent.
 *         in: x-www-form-urlencoded
 *         required: false
 *         type: integer
 *     responses:
 *       200:
 *         description: Reminder updated with success
 *         content:
 *           application/json:
 *             example: {
 *               reminders: {
 *                 id: 'vXIUuaGkH4kukbwRH5cU',
 *                 createdAt: 1605969562,
 *                 updatedAt: 1605969562,
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

    const { sendAt } = req.body
    if (sendAt) {
        const sendAtTs = Timestamp.fromMillis(parseInt(sendAt) * 1000)
        assertTimestampInFuture(sendAtTs)
        dataToEdit.sendAt = sendAtTs
    }

    await ReminderDao.update(dataToEdit)

    const reminder = await ReminderDao.get(reminderId)

    res.send({
        reminder,
    })
})
