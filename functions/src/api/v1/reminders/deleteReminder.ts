import { Request, Response } from 'express'
import { wrap } from 'async-middleware'
import { assertRightToEditRoom } from '../../../db/assertRightsToEditRoom'
import { deleteReminderDb } from '../../../db/remindersDb'

/**
 * @swagger
 * /v1/rooms/{roomId}/reminders/{reminderId}:
 *   delete:
 *     description: Delete an existing reminder. This will also delete all the data in database, meaning the destinations will no longer be visible to anyone, including you. There will be no solution to retrieve those data afterward.
 *     tags:
 *       - rooms
 *     consumes:
 *     - multipart/form-data
 *     produces:
 *     - application/json
 *     responses:
 *       204:
 *         description: Reminder deleted with success
 *       401:
 *         description: missing authorization bearer token
 *       403:
 *         description: authorization header present but not valid
 *       412:
 *         description: authorization header present but not formatted correctly
 */
export const deleteReminder = wrap(async (req: Request, res: Response) => {
    const userId = res.locals.uid
    const { roomId, reminderId } = req.params
    await assertRightToEditRoom(roomId, userId)

    await deleteReminderDb(reminderId)

    res.send()
})
