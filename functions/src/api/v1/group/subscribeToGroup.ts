import { wrap } from 'async-middleware'
import { Request, Response } from 'express'
import { UID } from '../../../types/uid'
import { GroupDao } from '../../../db/GroupDao'
import { GroupId } from '../../../types/Group'
import { assertNewResourceCreationGranted } from '../subscription/assertNewResourceCreationGranted'
import { messaging } from '../../../firebase/firebase'
import { MessagingServerError } from '../../errors/HttpError'

/**
 * @swagger
 * /v1/groups/{groupId}/subscribe:
 *   post:
 *     description: Subscribe a user's device to a group in order to receive push notifications.<br/>Warning! The user does not need to be in the group yet (it will be automatically added), but this will change later on. Also, the group owner accounts/subscription status need to be valid.
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
 *         description: Device subscribed to push notification successfully
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
export const subscribeToGroup = wrap(async (req: Request, res: Response) => {
    const userId: UID = res.locals.uid
    const groupId: GroupId = req.params.groupId
    const registrationToken = req.body.registrationToken
    const group = await GroupDao.get(groupId)
    await assertNewResourceCreationGranted(group.ownerUserId)

    if (!group.members.includes(userId)) {
        await GroupDao.addMembers(groupId, [
            {
                name: userId,
                id: userId,
            },
        ])
    }

    await subscribeUserToGroup(registrationToken, group.id)

    res.status(204).send()
})

export const subscribeUserToGroup = async (
    registrationToken: string,
    groupId: GroupId
): Promise<void> => {
    const { successCount } = await messaging().subscribeToTopic(
        registrationToken,
        groupId
    )

    if (successCount !== 1) {
        throw new MessagingServerError('Failed to subscribe to topic')
    }
}
