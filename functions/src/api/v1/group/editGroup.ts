import { wrap } from 'async-middleware'
import { Request, Response } from 'express'
import { UID } from '../../../types/uid'
import { assertGroupEditAllowed } from './groupRights'
import { GroupId } from '../../../types/Group'
import { GroupDao } from '../../../db/GroupDao'

/**
 * @swagger
 * /v1/groups/{groupId}/:
 *   patch:
 *     description: Edit an existing group, only allowed for the group owner. This is not to edit the members of the group (for that, use add/removeMembers route)
 *     tags:
 *       - groups
 *     consumes:
 *     - multipart/form-data
 *     produces:
 *     - application/json
 *     parameters:
 *       - name: name
 *         description: The group name
 *         in: x-www-form-urlencoded
 *         required: true
 *         type: string
 *     responses:
 *       204:
 *         description: Group edited with success
 *       400:
 *         $ref: '#/components/responses/400'
 *       401:
 *         $ref: '#/components/responses/401'
 *       403:
 *         $ref: '#/components/responses/403'
 *       412:
 *         $ref: '#/components/responses/412'
 */
export const editGroup = wrap(async (req: Request, res: Response) => {
    const userId: UID = res.locals.uid
    const groupId: GroupId = req.params.groupId
    await assertGroupEditAllowed(userId, groupId)

    const name = req.body.name

    await GroupDao.update({
        id: groupId,
        name,
    })

    res.status(204).send()
})
