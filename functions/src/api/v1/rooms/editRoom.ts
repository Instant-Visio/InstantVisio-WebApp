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
 *       - $ref: '#/components/parameters/room/password'
 *       - $ref: '#/components/parameters/room/startAt'
 *       - $ref: '#/components/parameters/room/name'
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
        roomId: roomId,
    }

    if (req.body.password && req.body.password.length > 0) {
        dataToEdit.password = req.body.password
    }
    if (req.body.startTimestamp) {
        dataToEdit.startAt = Timestamp.fromMillis(
            parseInt(req.body.startAt) * 1000
        )
    }
    if (req.body.name) {
        dataToEdit.startAt = req.body.name
    }

    await RoomDao.update(dataToEdit)

    res.send()
})
