import { UID } from '../../../types/uid'
import { PaymentRequiredError } from '../../errors/HttpError'
import { UserDao } from '../../../db/UserDao'

export const assertNewResourceCreationGranted = async (userId: UID) => {
    const user = await UserDao.get(userId)
    if (!user.subscription.isActive) {
        throw new PaymentRequiredError(
            'No active subscription, payment required'
        )
    }
    if (user.subscription.isQuotaReached) {
        throw new PaymentRequiredError('Quota reached')
    }
}
