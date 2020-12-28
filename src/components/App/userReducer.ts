import { UID } from '../../../types/uid'
import { JWTToken } from '../../../types/JWT'
import {
    SIGNOUT,
    SIGNIN_ERROR,
    SIGNIN_SUCCESS,
    REGISTER_PUSH_NOTIF_TOKEN,
} from '../../actions/userActionsTypes'
import produce, { Draft } from 'immer'

export interface User {
    token: JWTToken
    registrationToken: string
    userId: UID
    isAnonymous: boolean
}

export interface UserState {
    user: User
    isLoading: boolean
    error: null | unknown
}

const initialState = {
    user: {
        token: '',
        registrationToken: '',
        userId: '',
        isAnonymous: true,
    },
    isLoading: true,
    error: null,
}

export const userReducer = produce(
    (draft: Draft<UserState>, { type, payload }) => {
        switch (type) {
            case SIGNIN_SUCCESS:
                draft.user = {
                    token: payload.token,
                    registrationToken: '',
                    isAnonymous: payload.isAnonymous,
                    userId: payload.userId,
                }
                draft.error = null
                draft.isLoading = false
                break
            case SIGNIN_ERROR:
                draft.error = payload.error
                draft.isLoading = false
                break
            case SIGNOUT:
                draft.user = {
                    token: '',
                    registrationToken: '',
                    isAnonymous: true,
                    userId: '',
                }
                draft.error = null
                draft.isLoading = false
                break
            case REGISTER_PUSH_NOTIF_TOKEN:
                draft.user = {
                    ...draft.user,
                    registrationToken: payload.registrationToken,
                }
                break
        }
    },
    initialState
)
