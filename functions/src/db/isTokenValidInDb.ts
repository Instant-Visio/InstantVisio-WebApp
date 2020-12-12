import { db } from '../firebase/firebase'
import { UserData } from '../types/UserData'
import { JWTData, JWTToken } from '../types/JWT'
import { COLLECTIONS } from './constants'

export const isTokenValidInDb = async (
    jwtData: JWTData,
    token: JWTToken
): Promise<boolean> => {
    const userDocumentSnapshot = await db
        .collection(COLLECTIONS.users)
        .doc(jwtData.uid)
        .get()

    if (!userDocumentSnapshot?.exists) {
        return false
    }

    const userData = <UserData>userDocumentSnapshot.data()

    return (
        userData.tokens &&
        userData.tokens[token] &&
        userData.tokens[token].valid
    )
}
