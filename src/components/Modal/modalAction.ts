import { ModalType } from './types'
import { HIDE_MODAL, SHOW_MODAL, ModalActionTypes } from './modalActionTypes'

export const showModal = (modalType: ModalType): ModalActionTypes => ({
    type: SHOW_MODAL,
    payload: {
        modalType,
    },
})

export const hideModal = (): ModalActionTypes => ({
    type: HIDE_MODAL,
})
