import produce, { Draft } from 'immer'
import { HIDE_MODAL, SHOW_MODAL } from './modalActionTypes'
import { ModalState } from './modalSelector'

const initialState = {
    isDisplayed: false,
    modalType: null,
}

export const modalReducer = produce(
    (draft: Draft<ModalState>, { type, payload }) => {
        switch (type) {
            case HIDE_MODAL:
                return initialState
            case SHOW_MODAL:
                draft.isDisplayed = true
                draft.modalType = payload.modalType
                break
        }
    },
    initialState
)
