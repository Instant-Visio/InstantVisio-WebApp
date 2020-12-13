import { UserState } from '../reducers/user'
import { createSelector } from 'reselect'

export const selectToken = createSelector(
    ({ user }) => user,
    ({ token }) => token
)
