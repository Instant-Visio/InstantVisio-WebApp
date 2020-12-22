import { AppState } from '../../reducers/rootReducer'
import { createSelector } from 'reselect'

export interface LoginModalState {
    isDisplayed: false
}

export const selectLoginModal = createSelector(
    (state: AppState) => state.loginModal,
    (loginModal: LoginModalState) => loginModal
)
