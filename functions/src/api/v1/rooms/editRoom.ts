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
 *       - $ref: '#/components/parameters/room/hideChatbot'
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

    if (req.body?.password?.length) {
        dataToEdit.password = req.body.password
    }
    if (req.body.hideChatbot) {
        dataToEdit['hideChatbot'] = req.body.hideChatbot === 'true'
    }
    if (req.body.startTimestamp) {
        dataToEdit.startAt = Timestamp.fromMillis(+req.body.startAt * 1000)
    }
    if (req.body.name) {
        dataToEdit.startAt = req.body.name
    }

    await RoomDao.update(dataToEdit)

    res.send()
})
