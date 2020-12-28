import { AppState } from './../../reducers/rootReducer'
import { createSelector } from 'reselect'
import { UserState } from './userReducer'

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

export const selectIsPremiumUser = createSelector(
    selectUser,
    selectToken,
    (user, token) => token && !user.isAnonymous
)
