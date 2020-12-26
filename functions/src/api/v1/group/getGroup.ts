import { wrap } from 'async-middleware'
import { Request, Response } from 'express'
import { UID } from '../../../types/uid'
import { GroupId } from '../../../types/Group'
import { assertGroupReadAllowed } from './groupRights'
import { GroupDao } from '../../../db/GroupDao'

/**
 * @swagger
 * /v1/groups/{groupId}/:
 *   get:
 *     description: Get the given group. Members user ids will be returned for regular members and all members details will be returned for the owner.
 *     tags:
 *       - groups
 *     consumes:
 *     - multipart/form-data
 *     produces:
 *     - application/json
 *     responses:
 *       200:
 *         description: Group detail
 *         content:
 *           application/json:
 *             example: {
 *                 id: 'vXIUuaGkH4kukbwRH5cU',
 *                 ownerUserId: 'fj23ioezjfo12Cdzjk19nca',
 *                 name: 'group name',
 *                 createdAt: 1605969562,
 *                 updatedAt: 1605969562,
 *                 memberCount: 3,
 *                 members: {}
 *             }
 *       400:
 *         $ref: '#/components/responses/400'
 *       401:
 *         $ref: '#/components/responses/401'
 *       403:
 *         $ref: '#/components/responses/403'
 *       412:
 *         $ref: '#/components/responses/412'
 */
export const getGroup = wrap(async (req: Request, res: Response) => {
    const userId: UID = res.locals.uid
    const groupId: GroupId = req.params.groupId
    const { isOwner } = await assertGroupReadAllowed(userId, groupId)

    const {
        name,
        ownerUserId,
        members,
        membersDetails,
        createdAt,
        updatedAt,
    } = await GroupDao.get(groupId)

    res.send({
        id: groupId,
        name,
        ownerUserId,
        memberCount: members.length,
        members: isOwner ? membersDetails : {},
        createdAt: createdAt.seconds,
        updatedAt: updatedAt.seconds,
    })
})
