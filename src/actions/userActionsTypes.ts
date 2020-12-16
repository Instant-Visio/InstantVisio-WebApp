import { JWTToken } from '../../types/JWT'
import { UID } from '../../types/uid'

export const SIGNOUT = 'SIGNOUT'
export const SIGNIN_ERROR = 'SIGNIN_ERROR'
export const SIGNIN_SUCCESS = 'SIGNIN_SUCCESS'

interface SetSignInAction {
    type: typeof SIGNIN_SUCCESS
    payload: {
        token: JWTToken
        isAnonymous: boolean
        userId: UID
    }
}

interface SetSignOut {
    type: typeof SIGNOUT
}

interface SetSignInError {
    type: typeof SIGNIN_ERROR
    payload: {
        error: unknown
    }
}

export type UserActionsTypes = SetSignInAction | SetSignOut | SetSignInError
