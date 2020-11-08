import { JWTData } from '../../types/JWTData'
import { JWTToken } from '../../types/JWTToken'
import { db } from '../../firebase/firebase'
import { UserData } from '../../types/UserData'

export const isTokenValidInDb = async (
    jwtData: JWTData,
    token: JWTToken
): Promise<boolean> => {
    const result = await db.collection('users').doc(jwtData.uid).get()

    if (!result || !result.exists) {
        return false
    }

    const userData = <UserData>result.data()

    return (
        userData.tokens &&
        userData.tokens[token] &&
        userData.tokens[token].valid
    )
}
