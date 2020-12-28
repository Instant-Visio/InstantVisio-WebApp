import { wrap } from 'async-middleware'
import { Request, Response } from 'express'
import { BadRequestError, ForbiddenError } from '../../errors/HttpError'
import { UserDao } from '../../../db/UserDao'
import { arrayUnion } from '../../../firebase/firebase'

/**
 * @swagger
 * /v1/users/{userId}/addRegistrationToken:
 *   post:
 *     description: Add a registration token to a user in order to receive push notification on the device
 *     tags:
 *       - users
 *     consumes:
 *     - multipart/form-data
 *     produces:
 *     - application/json
 *     parameters:
 *       - name: registrationToken
 *         description: The registration token from Firebase messaging.
 *         in: x-www-form-urlencoded
 *         required: true
 *         type: string
 *     responses:
 *       204:
 *         description: Registration token saved with success
 *       401:
 *         $ref: '#/components/responses/401'
 *       403:
 *         $ref: '#/components/responses/403'
 *       412:
 *         $ref: '#/components/responses/412'
 */
export const addRegistrationToken = wrap(
    async (req: Request, res: Response) => {
        const currentUid = res.locals.uid
        const requestedUserId = req.params.userId

        if (requestedUserId !== currentUid) {
            throw new ForbiddenError('Not authorized to get this resource')
        }

        const { registrationToken } = req.body

        if (!registrationToken) {
            throw new BadRequestError('Missing registration token')
        }

        await UserDao.update(currentUid, {
            registrationTokens: arrayUnion(registrationToken),
        })

        res.status(204).send()
    }
)
