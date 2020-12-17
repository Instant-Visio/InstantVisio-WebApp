import { Request, Response } from 'express'
import { assertRightToEditRoom } from '../../../db/assertRightsToEditRoom'
import { wrap } from 'async-middleware'
import { Timestamp } from '../../../firebase/firebase'
import { RoomDao, RoomEditData } from '../../../db/RoomDao'

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
 *       - name: password
 *         description: (optional) The room password
 *         in: x-www-form-urlencoded
 *         required: false
 *         type: string
 *       - name: startAt
 *         description: (optional) The UTC timestamp in seconds at which the meeting is scheduled to start.
 *         in: x-www-form-urlencoded
 *         required: false
 *         type: integer
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
    await assertRightToEditRoom(roomId, res.locals.uid)

    const dataToEdit: RoomEditData = {
        id: roomId,
    }

    if (req.body.password) {
        dataToEdit['password'] = req.body.password
    }
    if (req.body.startTimestamp) {
        dataToEdit['startAt'] = Timestamp.fromMillis(
            parseInt(req.body.startAt) * 1000
        )
    }

    await RoomDao.update(dataToEdit)

    res.send()
})
