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
                draft = {
                    message: payload.message,
                    isError: true,
                    isDisplayed: true,
                }
                break
            case SHOW_SUCCESS_SNACKBAR:
                draft = {
                    message: payload.message,
                    isError: false,
                    isDisplayed: true,
                }
                break
            case HIDE_SNACKBAR:
                draft.isDisplayed = false
                break
        }
    },
    initialState
)
