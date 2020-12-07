import { functions } from '../firebase/firebase'
import { UID } from '../../functions/src/types/uid'
import { JWTToken } from '../../functions/src/types/JWT'

export const getJwtToken = async (uid: UID): Promise<JWTToken> => {
    try {
        const result = await functions.getToken({
            uid,
        })

        const jwtToken: JWTToken = result?.data.token
        if (!jwtToken) {
            throw new Error('JwtToken could not be fetched')
        }

        return jwtToken
    } catch (e) {
        console.error(e)
        throw e
    }
}
