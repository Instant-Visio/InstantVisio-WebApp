export const SHOW_ERROR_SNACKBAR = 'SHOW_ERROR_SNACKBAR'
export const SHOW_SUCCESS_SNACKBAR = 'SHOW_SUCCESS_SNACKBAR'
export const HIDE_SNACKBAR = 'HIDE_SNACKBAR'

interface ShowErrorSnackbarAction {
    type: typeof SHOW_ERROR_SNACKBAR
    payload: {
        message: string
    }
}

interface ShowSuccessSnackbarAction {
    type: typeof SHOW_SUCCESS_SNACKBAR
    payload: {
        message: string
    }
}

interface HideSnackbarAction {
    type: typeof HIDE_SNACKBAR
    payload: {}
}

export type SnackbarActionsTypes =
    | HideSnackbarAction
    | ShowSuccessSnackbarAction
    | ShowErrorSnackbarAction
