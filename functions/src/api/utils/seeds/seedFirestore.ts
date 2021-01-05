import { db } from '../../../firebase/firebase'
import { COLLECTIONS } from '../../../db/constants'
import { GroupDao } from '../../../db/GroupDao'
import { setNewUserData } from '../../v1/utils/UserUtils'

export const seedFirestore = async (users: any) => {
    const { premiumUser } = users
    const usersList = Object.keys(users).map((userType) => users[userType])
    for (const user of usersList) {
        await setNewUserData(user.id, user)
    }

    await db
        .collection(COLLECTIONS.users)
        .doc(premiumUser.id)
        .set(
            {
                registrationTokens: ['toto'],
            },
            { merge: true }
        )

    await GroupDao.set('test-group', premiumUser.id, 'test-group', '0000')
}
