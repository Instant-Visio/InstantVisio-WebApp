import { AppState } from './../../../reducers/rootReducer'
import { createSelector } from 'reselect'

export interface BackdropState {
    isDisplayed: boolean
}

export const selectBackdrop = createSelector(
    (state: AppState) => state.backdrop,
    ({ isDisplayed }: BackdropState) => isDisplayed
)
