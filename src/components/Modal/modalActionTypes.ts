import { ModalType } from './types'
export const SHOW_MODAL = 'SHOW_MODAL'
export const HIDE_MODAL = 'HIDE_MODAL'

interface ShowModalAction {
    type: typeof SHOW_MODAL
    payload: {
        modalType: ModalType
    }
}

interface HideModalAction {
    type: typeof HIDE_MODAL
}

export type ModalActionTypes = ShowModalAction | HideModalAction
