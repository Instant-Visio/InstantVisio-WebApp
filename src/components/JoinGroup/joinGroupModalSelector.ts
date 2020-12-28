import { AppState } from '../../reducers/rootReducer'
import { createSelector } from 'reselect'

export interface JoinGroupModalState {
    isDisplayed: boolean
}

export const selectJoinGroupModal = createSelector(
    (state: AppState) => state.joinGroupModal,
    (joinGroupModal: JoinGroupModalState) => joinGroupModal
)
