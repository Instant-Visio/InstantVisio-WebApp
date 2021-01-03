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
 *     parameters:
 *       - in: query
 *         name: startingAfter
 *         description: (optional) Only return the room starting after the given timestamp in seconds (startAt)
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: All the rooms linked to this token
 *         content:
 *           application/json:
 *             example: [{
 *               id: 'vXIUuaGkH4kukbwRH5cU',
 *               name: 'Monday meeting',
 *               createdAt: 1605969562,
 *               updatedAt: 1605969562,
 *               startTimestamp: 1605969562,
 *               roomUrl: "http://example.com/room/id?passcode=toto",
 *               password: "password",
 *               timezone: "Europe/Paris",
 *               hostName: "Bilbo"
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
export const getRooms = wrap(async (req: Request, res: Response) => {
    const uid = res.locals.uid
    const startingAfter = <string>req.query.startingAfter

    const rooms = await RoomDao.listByUserId(
        uid,
        startingAfter ? parseInt(startingAfter) : 0
    )

    res.send(rooms)
})
