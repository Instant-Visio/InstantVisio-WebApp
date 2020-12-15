import { UID } from '../types/uid'
import { db, serverTimestamp } from '../firebase/firebase'
import { NotFoundError } from '../api/errors/HttpError'
import { User } from '../types/User'
import { COLLECTIONS } from './constants'

export const getUserDb = async (userId: UID): Promise<User> => {
    const userDocumentSnapshot = await db.collection('users').doc(userId).get()

    if (!userDocumentSnapshot?.exists) {
        throw new NotFoundError('Resource does not exist')
    }
    return <User>{
        id: userId,
        ...userDocumentSnapshot.data(),
    }
}

export const updateUserDb = async (userId: UID, data: object) => {
    await db
        .collection(COLLECTIONS.users)
        .doc(userId)
        .set(
            {
                ...data,
                updatedAt: serverTimestamp(),
            },
            { merge: true }
        )
}
