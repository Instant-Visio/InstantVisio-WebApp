import { AppState } from '../../../../reducers/rootReducer'
import { createSelector } from 'reselect'

export interface DisplayState {
    isDisplayed: boolean
}

export interface AppBarState extends DisplayState {}

export const selectAppBar = createSelector(
    (state: AppState) => state.appBar,
    (appBar: AppBarState) => appBar
)
