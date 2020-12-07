import { getJwtToken } from '../actions/getJwtToken'
import { UID } from '../../functions/src/types/uid'
import { JWTToken } from '../../functions/src/types/JWT'

export const fetchToken = async (uid: UID): Promise<JWTToken> => {
    const jwtToken = await getJwtToken(uid)
    return jwtToken
}
