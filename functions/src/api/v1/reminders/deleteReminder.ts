import { Request, Response } from 'express'
import { wrap } from 'async-middleware'
import { assertRightToEditRoom } from '../../../db/assertRightsToEditRoom'
import { ReminderDao } from '../../../db/ReminderDao'

/**
 * @swagger
 * /v1/rooms/{roomId}/reminders/{reminderId}:
 *   delete:
 *     description: Delete an existing reminder. The destinations and hostName are saved in the room, delete the room to delete those data
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

    await ReminderDao.delete(reminderId)

    res.status(204).send()
})
