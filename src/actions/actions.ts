import { JWTToken } from '../../types/JWT'

export const setToken = (token: JWTToken) => {
    return { type: 'setToken', token }
}
