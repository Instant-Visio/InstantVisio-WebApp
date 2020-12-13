import { SIGNIN_SUCCESS } from './../actions/userActionsTypes'
import { JWTToken } from '../../types/JWT'
import { SIGNOUT, SIGNIN_ERROR } from '../actions/userActionsTypes'
import produce from 'immer'

export interface UserState {
    token: JWTToken | null
    isAnonymous: boolean
    isLoading: boolean
    error: string | null
}

const initialState = {
    token: null,
    error: null,
    isAnonymous: true,
    isLoading: true,
}

const userReducer = produce((draft, { type, payload }) => {
    switch (type) {
        case SIGNIN_SUCCESS:
            draft.token = payload.token
            draft.isAnonymous = payload.isAnonymous
            draft.isLoading = false
            break
        case SIGNIN_ERROR:
            draft.error = payload.error
            draft.isLoading = false
        case SIGNOUT:
            draft.token = null
            draft.isLoading = false
            break
    }
}, initialState)

export default userReducer
