import { Request, Response } from 'express'
import { wrap } from 'async-middleware'
import { assertRightToEditRoom } from '../../../db/assertRightsToEditRoom'
import { RoomDao } from '../../../db/RoomDao'

/**
 * @swagger
 * /v1/rooms/{roomId}/:
 *   delete:
 *     description: Delete an existing room, deleting the saved destinations also.
 *     tags:
 *       - rooms
 *     produces:
 *     - application/json
 *     responses:
 *       204:
 *         description: Room deleted with success
 *       401:
 *         $ref: '#/components/responses/401'
 *       403:
 *         $ref: '#/components/responses/403'
 *       412:
 *         $ref: '#/components/responses/412'
 */
export const deleteRoom = wrap(async (req: Request, res: Response) => {
    const userId = res.locals.uid
    const { roomId } = req.params
    await assertRightToEditRoom(roomId, userId)

    await RoomDao.delete(roomId)

    res.status(204).send()
})
