import { createSelector } from 'reselect'
import { User } from './userReducer'

export const selectToken = createSelector(
    (state: any) => state.user,
    (user: User) => user.token
)
