import { wrap } from 'async-middleware'
import { Request, Response } from 'express'
import { UID } from '../../../types/uid'
import { GroupId } from '../../../types/Group'
import { messaging } from '../../../firebase/firebase'
import { MessagingServerError } from '../../errors/HttpError'
import { assertGroupReadAllowed } from './groupRights'

/**
 * @swagger
 * /v1/groups/{groupId}/unsubscribe:
 *   delete:
 *     description: Unsubscribe a device from a group.
 *     tags:
 *       - groups
 *     consumes:
 *     - multipart/form-data
 *     produces:
 *     - application/json
 *     parameters:
 *       - name: registrationToken
 *         description: The registrationToken associated with this user device
 *         in: x-www-form-urlencoded
 *         required: true
 *         type: string
 *     responses:
 *       204:
 *         description: Device unsubscribed to push notification successfully
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
export const unsubscribeFromGroup = wrap(
    async (req: Request, res: Response) => {
        const userId: UID = res.locals.uid
        const groupId: GroupId = req.params.groupId
        const registrationToken = req.body.registrationToken
        await assertGroupReadAllowed(userId, groupId)

        const { successCount } = await messaging().unsubscribeFromTopic(
            registrationToken,
            groupId
        )

        if (successCount !== 1) {
            throw new MessagingServerError('Failed to unsubscribe to topic')
        }

        res.status(204).send()
    }
)
