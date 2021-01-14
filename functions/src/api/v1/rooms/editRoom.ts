import { Request, Response } from 'express'
import { assertRightToEditRoom } from '../../../db/assertRightsToEditRoom'
import { wrap } from 'async-middleware'
import { Timestamp } from '../../../firebase/firebase'
import { RoomDao, RoomEditData } from '../../../db/RoomDao'
import { BadRequestError } from '../../errors/HttpError'
import { parseDestinations } from '../utils/parseDestinations'
import { parseSendsAt } from './parseSendsAt'
import { ReminderDao } from '../../../db/ReminderDao'
import { RoomId } from '../../../types/Room'

/**
 * @swagger
 * /v1/rooms/{roomId}:
 *   patch:
 *     description: Edit an existing room.
 *     tags:
 *       - rooms
 *     consumes:
 *     - multipart/form-data
 *     produces:
 *     - application/json
 *     parameters:
 *       - $ref: '#/components/parameters/room/password'
 *       - $ref: '#/components/parameters/room/startAt'
 *       - $ref: '#/components/parameters/room/name'
 *       - $ref: '#/components/parameters/room/hideChatbot'
 *       - $ref: '#/components/parameters/room/destinations'
 *       - $ref: '#/components/parameters/room/hostName'
 *       - $ref: '#/components/parameters/room/timezone'
 *       - name: sendsAt
 *         description: (optional) An array of UTC timestamp(s) in seconds at which the reminder(s) are scheduled to be sent. If supplied, this will replace ALL room reminders if adding those reminders first is successful.
 *         in: x-www-form-urlencoded
 *         required: false
 *         type: string
 *         examples:
 *            mixed:
 *                summary: Multiple sendAt dates
 *                value: '[1708118298, 1808118298]'
 *     responses:
 *       204:
 *         description: Room edited with success
 *       401:
 *         description: missing authorization bearer token
 *       403:
 *         description: invalid authorization header
 *       404:
 *         description: room does not exist
 *       412:
 *         description: authorization header wrong format
 */
export const editRoom = wrap(async (req: Request, res: Response) => {
    const roomId = req.params.roomId
    const room = await assertRightToEditRoom(roomId, res.locals.uid)

    const dataToEdit: RoomEditData = {
        id: roomId,
    }

    if (req.body?.password?.length) {
        dataToEdit.password = req.body.password
    }
    if (req.body.hideChatbot) {
        dataToEdit.hideChatbot = req.body.hideChatbot === 'true'
    }
    if (req.body.startAt) {
        dataToEdit.startAt = Timestamp.fromMillis(+req.body.startAt * 1000)
    }
    if (req.body.name) {
        dataToEdit.name = req.body.name
    }
    if (req.body.destinations) {
        if (!req.body.hostName && !room.hostName) {
            throw new BadRequestError('Missing hostName in request body')
        }
        dataToEdit.destinations = parseDestinations(req.body.destinations)
    }
    if (req.body.hostName) {
        dataToEdit.hostName = req.body.hostName
    }
    if (req.body.timezone) {
        dataToEdit.timezone = req.body.timezone
    }

    await RoomDao.update(dataToEdit)

    if (req.body.sendsAt) {
        await updateReminders(roomId, req.body.sendsAt)
    }

    res.send()
})

const updateReminders = async (roomId: RoomId, sendsAt: string) => {
    const sendsAtValues = parseSendsAt(sendsAt)
    if (sendsAtValues.length > 0) {
        const oldReminders = await ReminderDao.listByRoomId(roomId)

        for (const sendAt of sendsAtValues) {
            const sendAtMillis = parseInt(sendAt) * 1000
            const sendAtTimestamp = Timestamp.fromMillis(sendAtMillis)
            await ReminderDao.add(roomId, sendAtTimestamp)
        }

        for (const reminder of oldReminders) {
            await ReminderDao.delete(reminder.id)
        }
    }
}
