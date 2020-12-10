import { UID } from '../../../../../types/uid'
import { getUser } from '../../../db/getUser'
import { PaymentRequiredError } from '../../errors/HttpError'

export const assertNewRoomCreationGranted = async (userId: UID) => {
    const user = await getUser(userId)
    if (!user.subscriptionActive) {
        throw new PaymentRequiredError(
            'No active subscription, payment required'
        )
    }
    if (user.quotaReached) {
        throw new PaymentRequiredError('Quota reached')
    }
}
