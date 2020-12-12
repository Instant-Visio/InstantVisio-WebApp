import { UID } from '../../../types/uid'
import { getUser } from '../../../db/getUser'
import { PaymentRequiredError } from '../../errors/HttpError'

export const assertNewRoomCreationGranted = async (userId: UID) => {
    const user = await getUser(userId)
    if (!user.subscription.isActive) {
        throw new PaymentRequiredError(
            'No active subscription, payment required'
        )
    }
    if (user.subscription.isQuotaReached) {
        throw new PaymentRequiredError('Quota reached')
    }
}
