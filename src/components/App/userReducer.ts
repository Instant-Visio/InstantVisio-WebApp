import { JWTToken } from '../../../types/JWT'
import { SET_TOKEN } from '../../actions/types'

const initialState = {
    user: { token: '' },
}

export interface User {
    token: JWTToken
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
