/*import { JWTToken } from '../../../types/JWT'
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
}*/

export interface User {
    token: JWTToken
    userId: UID
    isAnonymous: boolean
}

import { UID } from '../../../types/uid'
import { SIGNIN_SUCCESS } from '../../actions/userActionsTypes'
import { JWTToken } from '../../../types/JWT'
import { SIGNOUT, SIGNIN_ERROR } from '../../actions/userActionsTypes'
import produce from 'immer'

export interface UserState {
    user: User
    isLoading: boolean
    error: string | null
}

const initialState = {
    user: {
        token: '',
        userId: '',
    },
    isLoading: true,
    error: null,
}

export const userReducer = produce((draft, { type, payload }) => {
    switch (type) {
        case SIGNIN_SUCCESS:
            /*draft.token = payload.token
            draft.isAnonymous = payload.isAnonymous
            draft.isLoading = false*/
            break
        case SIGNIN_ERROR:
        /*draft.error = payload.error
            draft.isLoading = false*/
        case SIGNOUT:
            /*draft.token = null
            draft.isLoading = false*/
            break
    }
}, initialState)
