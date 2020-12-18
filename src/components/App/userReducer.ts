import { UID } from '../../../types/uid'
import { SIGNIN_SUCCESS } from '../../actions/userActionsTypes'
import { JWTToken } from '../../../types/JWT'
import { SIGNOUT, SIGNIN_ERROR } from '../../actions/userActionsTypes'
import produce, { Draft } from 'immer'

export interface User {
    token: JWTToken
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
                    isAnonymous: true,
                    userId: '',
                }
                draft.error = null
                draft.isLoading = false
                break
        }
    },
    initialState
)
