import { wrap } from 'async-middleware'
import { Request, Response } from 'express'
import { assertNewResourceCreationGranted } from '../subscription/assertNewResourceCreationGranted'
import { UID } from '../../../types/uid'
import { GroupDao } from '../../../db/GroupDao'
import { JSONParse } from '../utils/JSONParse'

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
    const members = JSONParse(req.body.members || '[]')

    const groupId = await GroupDao.add(userId, name, members)
    await GroupDao.update({
        id: groupId,
    })

    res.status(201).send({
        groupId,
    })
})
