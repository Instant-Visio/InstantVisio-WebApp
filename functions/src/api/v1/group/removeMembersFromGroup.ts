import { wrap } from 'async-middleware'
import { Request, Response } from 'express'
import { UID } from '../../../types/uid'
import { assertGroupEditAllowed } from './groupRights'
import { GroupId } from '../../../types/Group'
import { GroupDao } from '../../../db/GroupDao'
import { JSONParse } from '../utils/JSONParse'

/**
 * @swagger
 * /v1/groups/{groupId}/addMembers:
 *   delete:
 *     description: Remove members from an existing group, only allowed for the group owner.
 *     tags:
 *       - groups
 *     consumes:
 *     - multipart/form-data
 *     produces:
 *     - application/json
 *     parameters:
 *       - $ref: '#/components/parameters/group/members'
 *     responses:
 *       200:
 *         description: Members removed with success
 *       400:
 *         $ref: '#/components/responses/400'
 *       401:
 *         $ref: '#/components/responses/401'
 *       402:
 *         $ref: '#/components/responses/402'
 *       403:
 *         $ref: '#/components/responses/403'
 *       412:
 *         $ref: '#/components/responses/412'
 */
export const removeMembersFromGroup = wrap(
    async (req: Request, res: Response) => {
        const userId: UID = res.locals.uid
        const groupId: GroupId = req.params.groupId
        await assertGroupEditAllowed(userId, groupId)

        const members = JSONParse(req.body.members || '[]')

        await GroupDao.removeMembers(groupId, members)

        res.status(200).send()
    }
)
