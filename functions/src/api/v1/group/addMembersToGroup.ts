import { wrap } from 'async-middleware'
import { Request, Response } from 'express'
import { UID } from '../../../types/uid'
import { assertGroupEditAllowed } from './groupRights'
import { GroupId } from '../../../types/Group'
import { GroupDao } from '../../../db/GroupDao'
import { assertNewResourceCreationGranted } from '../subscription/assertNewResourceCreationGranted'
import { JSONParse } from '../utils/JSONParse'

/**
 * @swagger
 * /v1/groups/{groupId}/addMembers:
 *   post:
 *     description: Add members an existing group, only allowed for the group owner. It will not check if the user id is existing.
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
 *         description: Members added with success
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
export const addMembersToGroup = wrap(async (req: Request, res: Response) => {
    const userId: UID = res.locals.uid
    const groupId: GroupId = req.params.groupId
    await assertNewResourceCreationGranted(userId)
    await assertGroupEditAllowed(userId, groupId)

    const members = JSONParse(req.body.members || '[]')

    await GroupDao.addMembers(groupId, members)

    res.status(200).send()
})
