import { getJwtToken } from '../actions/getJwtToken'

export const fetchToken = async (uid: string) => {
    const jwtToken = await getJwtToken(uid)
    return jwtToken
}
