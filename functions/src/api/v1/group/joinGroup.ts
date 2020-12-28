import { wrap } from 'async-middleware'
import { Request, Response } from 'express'
import { UID } from '../../../types/uid'
import { GroupId } from '../../../types/Group'
import { GroupDao } from '../../../db/GroupDao'
import { BadRequestError, ForbiddenError } from '../../errors/HttpError'

/**
 * @swagger
 * /v1/groups/{groupId}/join:
 *   post:
 *     description: Request to join a group, by providing the group id, password and user name
 *     tags:
 *       - groups
 *     consumes:
 *     - multipart/form-data
 *     produces:
 *     - application/json
 *     parameters:
 *       - name: password
 *         description: The group password
 *         in: x-www-form-urlencoded
 *         required: true
 *         type: string
 *       - name: name
 *         description: The user name wanting to join a group
 *         in: x-www-form-urlencoded
 *         required: true
 *         type: string
 *     responses:
 *       204:
 *         description: Room joined with success
 *       400:
 *         $ref: '#/components/responses/400'
 *       401:
 *         $ref: '#/components/responses/401'
 *       403:
 *         $ref: '#/components/responses/403'
 *       412:
 *         $ref: '#/components/responses/412'
 */
export const joinGroup = wrap(async (req: Request, res: Response) => {
    const userId: UID = res.locals.uid
    const groupId: GroupId = req.params.groupId

    const { password, name } = req.body
    if (!password) {
        throw new BadRequestError('Password is required')
    }

    const group = await GroupDao.get(groupId)

    if (group.password !== password) {
        throw new ForbiddenError('Password does not match')
    }
    await GroupDao.addMembers(groupId, [
        {
            name,
            id: userId,
        },
    ])

    res.status(204).send()
})
