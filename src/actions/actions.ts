import { JWTToken } from '../../functions/src/types/JWT'

export const setToken = (token: JWTToken) => {
    return { type: 'setToken', token }
}
