import produce, { Draft } from 'immer'
import { HIDE_LOGIN_MODAL, SHOW_LOGIN_MODAL } from './loginModalActionTypes'
import { LoginModalState } from './loginModalSelector'

const initialState = {
    isDisplayed: false,
}

export const loginModalReducer = produce(
    (draft: Draft<LoginModalState>, { type, payload }) => {
        switch (type) {
            case HIDE_LOGIN_MODAL:
                return {
                    ...draft,
                    isDisplayed: false,
                }
            case SHOW_LOGIN_MODAL:
                return {
                    ...draft,
                    isDisplayed: true,
                }
        }
    },
    initialState
)
