import { Request, Response } from 'express'
import { wrap } from 'async-middleware'
import { assertRightToEditRoom } from '../../../db/assertRightsToEditRoom'
import { ReminderDao } from '../../../db/ReminderDao'

/**
 * @swagger
 * /v1/rooms/{roomId}/reminders/:
 *   delete:
 *     description: Delete all the reminders for the room
 *     tags:
 *       - rooms
 *     consumes:
 *     - multipart/form-data
 *     produces:
 *     - application/json
 *     responses:
 *       204:
 *         description: Reminders deleted with success
 *       401:
 *         description: missing authorization bearer token
 *       403:
 *         description: authorization header present but not valid
 *       412:
 *         description: authorization header present but not formatted correctly
 */
export const deleteReminders = wrap(async (req: Request, res: Response) => {
    const userId = res.locals.uid
    const { roomId } = req.params
    await assertRightToEditRoom(roomId, userId)

    const reminders = await ReminderDao.listByRoomId(roomId)
    for (const reminder of reminders) {
        await ReminderDao.delete(reminder.id)
    }

    res.status(204).send()
})
