import { AppState } from '../../reducers/rootReducer'
import { createSelector } from 'reselect'

export interface LoginModalState {
    isDisplayed: boolean
}

export const selectLoginModal = createSelector(
    (state: AppState) => state.loginModal,
    (loginModal: LoginModalState) => loginModal
)
