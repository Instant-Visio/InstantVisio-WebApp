import { JWTToken } from '../../types/JWT'
import { SET_TOKEN } from '../actions/types'

export const setToken = (token: JWTToken) => {
    return { type: SET_TOKEN, payload: { token } }
}
