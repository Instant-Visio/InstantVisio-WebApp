import { Request, Response } from 'express'
import { wrap } from 'async-middleware'
import { assertRightToEditRoom } from '../../../db/assertRightsToEditRoom'
import { BadRequestError } from '../../errors/HttpError'
import { ReminderDao } from '../../../db/ReminderDao'
import { Timestamp } from '../../../firebase/firebase'
import { assertTimestampInFuture } from './assertTimestampInFuture'
import { RoomId } from '../../../types/Room'
import { UID } from '../../../types/uid'
import { ReminderId } from '../../../types/Reminder'

/**
 * @swagger
 * /v1/rooms/{roomId}/reminders/:
 *   post:
 *     description: Create a new reminder. A reminder is composed the time at which the reminder will be send (timestamp seconds) as well as the room id
 *     tags:
 *       - rooms
 *     consumes:
 *     - multipart/form-data
 *     produces:
 *     - application/json
 *     parameters:
 *       - in: path
 *         name: roomId
 *         schema:
 *         type: integer
 *         required: true
 *         description: The room id
 *       - name: sendAt
 *         description: The UTC timestamp in seconds at which the reminder is scheduled to be sent.
 *         in: x-www-form-urlencoded
 *         required: true
 *         type: integer
 *     responses:
 *       201:
 *         description: Reminder created with success
 *         content:
 *           application/json:
 *             example: {
 *               reminderId: "aZxo2xskIaZxo2xskI"
 *             }
 *       400:
 *         description: request content (x-www-form-urlencoded) not correct
 *       401:
 *         description: missing authorization bearer token
 *       403:
 *         description: authorization header present but not valid
 *       412:
 *         description: authorization header present but not formatted correctly
 */
export const createReminderRoute = wrap(async (req: Request, res: Response) => {
    const userId = res.locals.uid
    const roomId = req.params.roomId
    const { sendAt } = req.body

    const reminderId = await createReminder({
        roomId,
        userId,
        sendAtSeconds: sendAt,
    })

    res.send({
        reminderId,
    })
})

export const createReminder = async ({
    roomId,
    userId,
    sendAtSeconds,
}: {
    roomId: RoomId
    userId: UID
    sendAtSeconds: string
}): Promise<ReminderId> => {
    await assertRightToEditRoom(roomId, userId)

    const sendAtMillis = parseInt(sendAtSeconds) * 1000

    if (!sendAtMillis) {
        throw new BadRequestError('Request body not formatted correctly')
    }

    const sendAtTimestamp = Timestamp.fromMillis(sendAtMillis)
    assertTimestampInFuture(sendAtTimestamp)

    return await ReminderDao.add(roomId, sendAtTimestamp)
}
