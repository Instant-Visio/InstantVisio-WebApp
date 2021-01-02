import { UID } from '../../../types/uid'
import { JWTToken } from '../../../types/JWT'
import {
    SIGNOUT,
    SIGNIN_ERROR,
    SIGNIN_SUCCESS,
    USER_DETAILS,
    REGISTER_PUSH_NOTIF_TOKEN,
} from '../../actions/userActionsTypes'
import produce, { Draft } from 'immer'

export interface UserSubscriptionQuotas {
    push: number
    minutes: number
    email: number
    sms: number
}

export interface UserSubscription {
    isActive: boolean
    isQuotaReached: boolean
    quotas: UserSubscriptionQuotas
    type: string
}

export interface UserUsage {
    sentEmails: number
    sentSMSs: number
    sentPushs: number
}

export interface UserDetails {
    subscription: UserSubscription
    usage: UserUsage
}

export interface User {
    token: JWTToken
    registrationToken: string
    userId: UID
    isAnonymous: boolean
    details: null | UserDetails
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
        details: null,
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
                    details: null,
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
                    details: null,
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
            case USER_DETAILS:
                draft.user.details = {
                    subscription: payload.subscription,
                    usage: payload.usage,
                }
                break
        }
    },
    initialState
)
