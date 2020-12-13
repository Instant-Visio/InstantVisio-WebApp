import { UID } from '../types/uid'
import { db } from '../firebase/firebase'
import { NotFoundError } from '../api/errors/HttpError'
import { User } from '../types/User'

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
