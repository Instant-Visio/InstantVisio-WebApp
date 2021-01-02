import { wrap } from 'async-middleware'
import { Request, Response } from 'express'
import { ForbiddenError } from '../../errors/HttpError'
import { UserDao, UserEditData } from '../../../db/UserDao'

/**
 * @swagger
 * /v1/users/{userId}/:
 *   patch:
 *     description: Edit an existing user infos
 *     tags:
 *       - users
 *     consumes:
 *     - multipart/form-data
 *     produces:
 *     - application/json
 *     parameters:
 *       - name: name
 *         description: The user name
 *         in: x-www-form-urlencoded
 *         required: false
 *         type: string
 *     responses:
 *       204:
 *         description: User edited with success
 *       400:
 *         $ref: '#/components/responses/400'
 *       401:
 *         $ref: '#/components/responses/401'
 *       403:
 *         $ref: '#/components/responses/403'
 *       412:
 *         $ref: '#/components/responses/412'
 */
export const editUser = wrap(async (req: Request, res: Response) => {
    const currentUid = res.locals.uid
    const requestedUserId = req.params.userId

    if (requestedUserId !== currentUid) {
        throw new ForbiddenError('Not authorized to get this resource')
    }

    const editData: UserEditData = {}

    const { name } = req.body

    if (name) {
        editData.name = name
    }

    await UserDao.update(currentUid, editData)

    res.status(204).send()
})
