import { db } from '../../../firebase/firebase'
import { COLLECTIONS } from '../../../db/constants'
import { UID } from '../../../types/uid'
import { GroupDao } from '../../../db/GroupDao'

export const seedFirestore = async (url: string, premiumUserId: UID) => {
    await db
        .collection(COLLECTIONS.users)
        .doc(premiumUserId)
        .set(
            {
                registrationTokens: ['toto'],
            },
            { merge: true }
        )

    await GroupDao.set('test-group', premiumUserId, 'test-group', '0000')
}
