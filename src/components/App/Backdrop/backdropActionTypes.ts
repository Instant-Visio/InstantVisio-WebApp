export const SHOW_BACKDROP = 'SHOW_BACKDROP'
export const HIDE_BACKDROP = 'HIDE_BACKDROP'

interface ShowBackdropAction {
    type: typeof SHOW_BACKDROP
    payload: {}
}

interface HideBackdropAction {
    type: typeof HIDE_BACKDROP
    payload: {}
}

export type BackdropActionsTypes = ShowBackdropAction | HideBackdropAction
