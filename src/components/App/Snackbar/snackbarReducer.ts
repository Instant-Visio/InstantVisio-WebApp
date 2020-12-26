import produce, { Draft } from 'immer'
import {
    HIDE_SNACKBAR,
    SHOW_ERROR_SNACKBAR,
    SHOW_SUCCESS_SNACKBAR,
} from './snackbarActionTypes'
import { SnackbarState } from './snackbarSelector'

const initialState = {
    isDisplayed: false,
    message: '',
    isError: false,
}

export const snackbarReducer = produce(
    (draft: Draft<SnackbarState>, { type, payload }) => {
        switch (type) {
            case SHOW_ERROR_SNACKBAR:
                return {
                    ...draft,
                    message: payload.message,
                    isError: true,
                    isDisplayed: true,
                }
            case SHOW_SUCCESS_SNACKBAR:
                return {
                    ...draft,
                    message: payload.message,
                    isError: false,
                    isDisplayed: true,
                }
            case HIDE_SNACKBAR:
                return {
                    ...draft,
                    isDisplayed: false,
                }
        }
    },
    initialState
)
