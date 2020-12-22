import {
    HIDE_SNACKBAR,
    SHOW_ERROR_SNACKBAR,
    SHOW_SUCCESS_SNACKBAR,
    SnackbarActionsTypes,
} from './snackbarActionTypes'

export const showSuccessMessage = (message: string): SnackbarActionsTypes => ({
    type: SHOW_SUCCESS_SNACKBAR,
    payload: {
        message,
    },
})

export const showErrorMessage = (message: string): SnackbarActionsTypes => ({
    type: SHOW_ERROR_SNACKBAR,
    payload: {
        message,
    },
})

export const hideMessage = (): SnackbarActionsTypes => ({
    type: HIDE_SNACKBAR,
    payload: {},
})
