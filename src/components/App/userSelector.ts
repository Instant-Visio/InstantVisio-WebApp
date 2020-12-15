import { createSelector } from 'reselect'
import { User, UserState } from './userReducer'

export const selectToken = createSelector(
    (state: UserState) => state.user,
    (user: User) => user.token
)
