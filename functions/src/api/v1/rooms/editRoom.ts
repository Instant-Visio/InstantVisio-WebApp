import { Request, Response } from 'express'
import { RoomEditData, updateRoom } from '../../../db/updateRoom'
import { RoomId, RoomSid } from '../../../types/Room'
import { assertRightToEditRoom } from '../../../db/assertRightsToEditRoom'
import { wrap } from 'async-middleware'

export interface NewRoomResponse {
    roomId: RoomId
    roomSid: RoomSid
}

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
 *     responses:
 *       200:
 *         description: Room edited with success
 *       401:
 *         description: missing authorization bearer token
 *       403:
 *         description: authorization header present but not valid
 *       404:
 *         description: room does not exist
 *       412:
 *         description: authorization header present but not formatted correctly
 */
export const editRoom = wrap(async (req: Request, res: Response) => {
    const roomId = req.params.roomId
    await assertRightToEditRoom(roomId, res.locals.uid)

    const dataToEdit: RoomEditData = {
        roomId: roomId,
    }

    if (req.body.password) {
        dataToEdit['password'] = req.body.password
    }

    await updateRoom(dataToEdit)

    res.send()
})
