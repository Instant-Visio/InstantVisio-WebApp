import { wrap } from 'async-middleware'
import { Request, Response } from 'express'
import { assertNewResourceCreationGranted } from '../subscription/assertNewResourceCreationGranted'
import { UID } from '../../../types/uid'
import { GroupDao } from '../../../db/GroupDao'
import { JSONParse } from '../utils/JSONParse'
import { GroupId } from '../../../types/Group'
import {
    BadRequestError,
    GroupConflictError,
    GroupNotFoundError,
} from '../../errors/HttpError'
import { Member } from '../../../types/Member'

/**
 * @swagger
 * /v1/groups/:
 *   post:
 *     description: Create a new group. The user within the token will be the group owner (not editable yet).
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
 *       - name: password
 *         description: The group password required to join it
 *         in: x-www-form-urlencoded
 *         required: true
 *         type: string
 *       - name: groupId
 *         description: (optional) the group id. If the requested group id is not available, an error will be thrown
 *         in: x-www-form-urlencoded
 *         required: false
 *         type: string
 *       - $ref: '#/components/parameters/group/members'
 *     responses:
 *       201:
 *         description: Group created with success
 *         content:
 *           application/json:
 *             example: {
 *               groupId: "aZxo2xskIaZxo2xskI"
 *             }
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
export const createGroup = wrap(async (req: Request, res: Response) => {
    const userId: UID = res.locals.uid
    await assertNewResourceCreationGranted(userId)

    const name = req.body.name
    const requestedGroupId = req.body.groupId
    const password = req.body.password
    const members = JSONParse(req.body.members || '[]')

    if (!password) {
        throw new BadRequestError('Password is required')
    }

    let groupId: GroupId
    if (requestedGroupId) {
        groupId = await tryCreateGroupWithPredefinedId(
            requestedGroupId,
            userId,
            password,
            members,
            name
        )
    } else {
        groupId = await GroupDao.add(userId, name, password, members)
        await GroupDao.update({
            id: groupId,
        })
    }

    res.status(201).send({
        groupId,
    })
})

const tryCreateGroupWithPredefinedId = async (
    groupId: GroupId,
    userId: UID,
    password: string,
    members: Member[],
    name: string
): Promise<GroupId> => {
    try {
        await GroupDao.get(groupId)
        throw new GroupConflictError()
    } catch (error) {
        if (error instanceof GroupNotFoundError) {
            await GroupDao.set(groupId, userId, name, password, members)
            return groupId
        } else {
            throw error
        }
    }
}
