import { getJwtToken } from '../actions/getJwtToken'
import { UID } from '../../types/uid'
import { JWTToken } from '../../types/JWT'

export const fetchToken = async (uid: UID): Promise<JWTToken> => {
    const jwtToken = await getJwtToken(uid)
    return jwtToken
}
