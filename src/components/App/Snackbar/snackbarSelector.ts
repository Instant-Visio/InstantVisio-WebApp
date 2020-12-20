import { AppState } from './../../../reducers/rootReducer'
import { createSelector } from 'reselect'

export interface SnackbarState {
    snackbar: {
        message?: string
        isError?: boolean
        isDisplayed: boolean
    }
}

export const selectSnackbar = createSelector(
    (state: AppState) => state.snackbar,
    (snackbar: SnackbarState) => snackbar
)
