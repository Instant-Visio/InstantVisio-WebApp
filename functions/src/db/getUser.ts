import { UID } from '../../../types/uid'
import { db } from '../firebase/firebase'
import { NotFoundError } from '../api/errors/HttpError'
import { UserData } from '../types/UserData'

export const getUser = async (userId: UID): Promise<UserData> => {
    const userDocumentSnapshot = await db.collection('users').doc(userId).get()

    if (!userDocumentSnapshot?.exists) {
        throw new NotFoundError('Resource does not exist')
    }
    return <UserData>{
        id: userId,
        ...userDocumentSnapshot.data(),
    }
}
