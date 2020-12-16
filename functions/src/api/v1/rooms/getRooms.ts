import { Request, Response } from 'express'
import { RoomDao } from '../../../db/RoomDao'
import { wrap } from 'async-middleware'

/**
 * @swagger
 * /v1/rooms/:
 *   get:
 *     description: List created rooms.
 *     tags: ['rooms']
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: All the rooms linked to this token
 *         content:
 *           application/json:
 *             example: [{
 *               id: 'vXIUuaGkH4kukbwRH5cU',
 *               createdAt: 1605969562,
 *               updatedAt: 1605969562,
 *               startTimestamp: 1605969562
 *             }]
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Room'
 *       401:
 *         description: missing authorization bearer token
 *       403:
 *         description: invalid authorization header
 *       412:
 *         description: authorization header wrong format
 */
export const getRooms = wrap(async (_: Request, res: Response) => {
    const uid = res.locals.uid
    const rooms = await RoomDao.listByUserId(uid)

    res.send(rooms)
})
