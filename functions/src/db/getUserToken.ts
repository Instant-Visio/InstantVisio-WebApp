import { UID } from '../types/uid'
import { JWTToken } from '../types/JWT'
import { db } from '../firebase/firebase'
import { UserData } from '../types/UserData'

export const getUserToken = async (userId: UID): Promise<JWTToken | null> => {
    const userDocumentSnapshot = await db.collection('users').doc(userId).get()

    if (!userDocumentSnapshot?.exists) {
        return null
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

    return null
}
