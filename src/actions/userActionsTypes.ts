import { JWTToken } from '../../types/JWT'
import { UID } from '../../types/uid'
import { UserDetails } from '../components/App/userReducer'

export const SIGNOUT = 'SIGNOUT'
export const SIGNIN_ERROR = 'SIGNIN_ERROR'
export const SIGNIN_SUCCESS = 'SIGNIN_SUCCESS'
export const REGISTER_PUSH_NOTIF_TOKEN = 'REGISTER_PUSH_NOTIF_TOKEN'
export const USER_DETAILS = 'USER_DETAILS'

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

interface SetUserDetails {
    type: typeof USER_DETAILS
    payload: UserDetails
}

interface SetRegistrationTokenAction {
    type: typeof REGISTER_PUSH_NOTIF_TOKEN
    payload: {
        registrationToken: string
    }
}

export type UserActionsTypes =
    | SetSignInAction
    | SetSignOut
    | SetSignInError
    | SetUserDetails
    | SetRegistrationTokenAction
