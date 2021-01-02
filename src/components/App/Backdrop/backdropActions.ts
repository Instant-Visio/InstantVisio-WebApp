import {
    SHOW_BACKDROP,
    HIDE_BACKDROP,
    BackdropActionsTypes,
} from './backdropActionTypes'

export const showBackdrop = (): BackdropActionsTypes => ({
    type: SHOW_BACKDROP,
    payload: {},
})

export const hideBackdrop = (): BackdropActionsTypes => ({
    type: HIDE_BACKDROP,
    payload: {},
})
