import { wrap } from 'async-middleware'
import { Request, Response } from 'express'
import { UID } from '../../../types/uid'
import { GroupDao } from '../../../db/GroupDao'

/**
 * @swagger
 * /v1/groups/:
 *   get:
 *     description: Get all the current user groups.
 *     tags:
 *       - groups
 *     produces:
 *     - application/json
 *     responses:
 *       200:
 *         description: user groups
 *         content:
 *           application/json:
 *             example: [{
 *                 id: 'vXIUuaGkH4kukbwRH5cU',
 *                 ownerUserId: 'fj23ioezjfo12Cdzjk19nca',
 *                 name: 'group name',
 *                 createdAt: 1605969562,
 *                 updatedAt: 1605969562,
 *                 memberCount: 3,
 *             }]
 *       400:
 *         $ref: '#/components/responses/400'
 *       401:
 *         $ref: '#/components/responses/401'
 *       403:
 *         $ref: '#/components/responses/403'
 *       412:
 *         $ref: '#/components/responses/412'
 */
export const getGroups = wrap(async (req: Request, res: Response) => {
    const userId: UID = res.locals.uid

    const groups = await GroupDao.listByUserId(userId)

    res.send(groups)
})
