import { UID } from '../../../types/uid'
import { getUserDb } from '../../../db/getUserDb'
import { PaymentRequiredError } from '../../errors/HttpError'

export const assertNewRoomCreationGranted = async (userId: UID) => {
    const user = await getUserDb(userId)
    if (!user.subscription.isActive) {
        throw new PaymentRequiredError(
            'No active subscription, payment required'
        )
    }
    if (user.subscription.isQuotaReached) {
        throw new PaymentRequiredError('Quota reached')
    }
}
