import { AppState } from '../../reducers/rootReducer'
import { createSelector } from 'reselect'
import { ModalType } from './types'

export interface ModalState {
    isDisplayed: boolean
    modalType: ModalType
}

export const selectModal = createSelector(
    (state: AppState) => state.modal,
    (modal: ModalState) => modal
)
