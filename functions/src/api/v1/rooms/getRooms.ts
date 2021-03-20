import { Request, Response } from 'express'
import { RoomDao } from '../../../db/RoomDao'
import { wrap } from 'async-middleware'
import { RoomStatus } from '../../../types/Room'
import { GroupDao } from '../../../db/GroupDao'

/**
 * @swagger
 * /v1/rooms/:
 *   get:
 *     description: List rooms linked to the current user id, either created room by the user, and rooms available to the user (in groups for example).
 *     tags: ['rooms']
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: query
 *         name: startingAfter
 *         description: (optional) Only return the room starting after the given timestamp in seconds (startAt)
 *         required: false
 *         schema:
 *           type: integer
 *       - in: query
 *         name: status
 *         description: (optional) the current room status. <br/>"created"= new or ongoing room, <br/>"ended"= room without participant for 5 minutes
 *         required: false
 *         schema:
 *           type: string
 *       - in: query
 *         name: includeGroups
 *         description: (optional) include rooms linked to the groups the user is a member of
 *         required: false
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Rooms list
 *         content:
 *           application/json:
 *             example: [{
 *               id: 'vXIUuaGkH4kukbwRH5cU',
 *               name: 'Monday meeting',
 *               createdAt: 1605969562,
 *               updatedAt: 1605969562,
 *               startAt: 1605969562,
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
    const startingAfterQuery = <string>req.query.startingAfter
    const statusQuery = <RoomStatus>req.query.status
    const includeGroups = <string>req.query.includeGroups

    const startingAfter = startingAfterQuery ? parseInt(startingAfterQuery) : 0
    const status = statusQuery ? statusQuery : undefined

    const createdByUserRooms = await RoomDao.listByUserId(
        uid,
        startingAfter,
        status
    )

    if (includeGroups === 'true') {
        const groups = await GroupDao.listByUserId(uid)
        const groupsIds = groups.map((group) => group.id).splice(0, 10)
        const groupRooms = await RoomDao.listByGroupsIds(
            groupsIds,
            startingAfter,
            status
        )
        res.send([...createdByUserRooms, ...groupRooms])
        return
    }

    res.send(createdByUserRooms)
})
