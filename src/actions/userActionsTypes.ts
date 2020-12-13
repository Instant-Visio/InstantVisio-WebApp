import { JWTToken } from '../../types/JWT'

export const SIGNOUT = 'SIGNOUT'
export const SIGNIN_ERROR = 'SIGNIN_ERROR'
export const SIGNIN_SUCCESS = 'SIGNIN_SUCCESS'

export interface SetSignInAction {
    type: typeof SIGNIN_SUCCESS
    payload: {
        token: JWTToken
        isAnonymous: boolean
    }
}

export interface SetSignOut {
    type: typeof SIGNOUT
}

export interface SetSignInError {
    type: typeof SIGNIN_ERROR
    payload: {
        error: unknown
    }
}
