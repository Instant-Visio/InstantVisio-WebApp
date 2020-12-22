import {
    HIDE_LOGIN_MODAL,
    SHOW_LOGIN_MODAL,
    LoginModalActionTypes,
} from './loginModalActionTypes'

export const showLoginModal = (): LoginModalActionTypes => ({
    type: SHOW_LOGIN_MODAL,
    payload: {},
})

export const hideLoginModal = (): LoginModalActionTypes => ({
    type: HIDE_LOGIN_MODAL,
    payload: {},
})
