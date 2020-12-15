import { JWTToken } from '../../../types/JWT'
import { UID } from '../../../types/uid'
import { SET_TOKEN } from '../../actions/types'

const initialState = {
    user: { token: '', userId: '' },
}

export interface User {
    token: JWTToken
    userId: UID
}
export interface UserState {
    user: User
}

export const userReducer = (
    state: UserState = initialState,
    { payload, type }
) => {
    switch (type) {
        case SET_TOKEN:
            return {
                ...state,
                token: payload.token,
            }
        default:
            return state
    }
}
