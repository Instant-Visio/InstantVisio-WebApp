import { createSelector } from 'reselect'

export const selectToken = createSelector(
    (state: any) => state.token,
    (token) => token
)
