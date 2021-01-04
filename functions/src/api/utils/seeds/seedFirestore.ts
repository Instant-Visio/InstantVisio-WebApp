import { db } from '../../../firebase/firebase'
import { COLLECTIONS } from '../../../db/constants'
import { GroupDao } from '../../../db/GroupDao'
import { setNewUserData } from '../../v1/utils/UserUtils'

export const seedFirestore = async (users: any) => {
    const { premiumUser, freeUser, overQuotaUser } = users
    await setNewUserData(premiumUser.id, premiumUser)
    await setNewUserData(freeUser.id, freeUser)
    await setNewUserData(overQuotaUser.id, overQuotaUser)

    await db
        .collection(COLLECTIONS.users)
        .doc(users.premiumUser.id)
        .set(
            {
                registrationTokens: ['toto'],
            },
            { merge: true }
        )

    await GroupDao.set('test-group', users.premiumUser.id, 'test-group', '0000')
}
