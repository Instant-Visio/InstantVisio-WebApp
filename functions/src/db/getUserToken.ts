import { UID } from '../types/uid'
import { JWTToken } from '../types/JWT'
import { db } from '../firebase/firebase'
import { UserData } from '../types/UserData'
import { BadRequestError, NotFoundError } from '../api/errors/HttpError'

export const getUserToken = async (userId: UID): Promise<JWTToken | null> => {
    const userDocumentSnapshot = await db.collection('users').doc(userId).get()

    if (!userDocumentSnapshot?.exists) {
        throw new NotFoundError('Resource does not exist')
    }

    const userData = <UserData>userDocumentSnapshot.data()

    if (userData.tokens) {
        const validTokens = Object.keys(userData.tokens).filter(
            (token) => userData.tokens[token].valid
        )

        if (validTokens.length > 0) {
            return validTokens[0]
        }
    }

    throw new BadRequestError('No available/valid token')
}
