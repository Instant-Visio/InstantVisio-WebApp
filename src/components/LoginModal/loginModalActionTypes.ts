export const SHOW_LOGIN_MODAL = 'SHOW_LOGIN_MODAL'
export const HIDE_LOGIN_MODAL = 'HIDE_LOGIN_MODAL'

interface ShowLoginModalAction {
    type: typeof SHOW_LOGIN_MODAL
    payload: {}
}

interface HideLoginModalAction {
    type: typeof HIDE_LOGIN_MODAL
    payload: {}
}

export type LoginModalActionTypes = ShowLoginModalAction | HideLoginModalAction
