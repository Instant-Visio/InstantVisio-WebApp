import { Request, Response } from 'express'
import { wrap } from 'async-middleware'
import { assertRightToEditRoom } from '../../../db/assertRightsToEditRoom'
import { ReminderDao } from '../../../db/ReminderDao'

/**
 * @swagger
 * /v1/rooms/{roomId}/reminders/:
 *   get:
 *     description: Get all reminders for the room.
 *     tags:
 *       - rooms
 *     produces:
 *     - application/json
 *     responses:
 *       200:
 *         description: Room's reminders
 *         content:
 *           application/json:
 *             example: {
 *               reminders: [{
 *                 id: 'vXIUuaGkH4kukbwRH5cU',
 *                 createdAt: 1605969562,
 *                 updatedAt: 1605969562,
 *                 sendAt: 1605969562,
 *                 isSent: false
 *               }]
 *             }
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Reminder'
 *       401:
 *         description: missing authorization bearer token
 *       403:
 *         description: authorization header present but not valid
 *       412:
 *         description: authorization header present but not formatted correctly
 */
export const getReminders = wrap(async (req: Request, res: Response) => {
    const userId = res.locals.uid
    const roomId = req.params.roomId
    await assertRightToEditRoom(roomId, userId)

    const reminders = await ReminderDao.listByRoomId(roomId)

    res.send({
        reminders,
    })
})
