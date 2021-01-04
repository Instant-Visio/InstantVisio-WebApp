import { AppState } from './../../reducers/rootReducer'
import { createSelector } from 'reselect'
import { User, UserState } from './userReducer'

interface QuotasUsageDetail {
    sent: number
    quota: number
}
export interface QuotasUsage {
    emails: QuotasUsageDetail
    pushs: QuotasUsageDetail
    sms: QuotasUsageDetail
    minutes: number
}

export const signInError = ({ user }) => user.error

export const selectUser = createSelector(
    (state: AppState) => state.user,
    ({ user }: UserState) => user
)

export const selectToken = createSelector(selectUser, ({ token }) => token)

export const selectRegistrationToken = createSelector(
    selectUser,
    ({ registrationToken }) => registrationToken
)

export const isLoading = ({ user }) => user.isLoading

export const selectQuotasUsage = createSelector(
    selectUser,
    ({ details }: User) => {
        if (!details) return null

        const { subscription, usage } = details

        if (!subscription || !usage) {
            return null
        }

        const quotas = subscription.quotas || {
            email: 0,
            sms: 0,
            push: 0,
            minutes: 0,
        }

        return {
            emails: {
                sent: usage.sentEmails,
                quota: quotas.email,
            },
            sms: {
                sent: usage.sentSMSs,
                quota: quotas.sms,
            },
            pushs: {
                sent: usage.sentPushs,
                quota: quotas.push,
            },
            minutes: quotas.minutes,
        }
    }
)

export const selectIsPremiumUser = createSelector(
    selectUser,
    selectToken,
    (user, token) => token && !user.isAnonymous
)
