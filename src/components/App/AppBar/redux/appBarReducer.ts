import produce, { Draft } from 'immer'
import { HIDE_APP_BAR, SHOW_APP_BAR } from './appBarActionTypes'
import { AppBarState } from './appBarSelectors'

const initialState = {
    isDisplayed: true,
}

export const appBarReducer = produce(
    (draft: Draft<AppBarState>, { type, payload }) => {
        switch (type) {
            case HIDE_APP_BAR:
                draft.isDisplayed = false
                break
            case SHOW_APP_BAR:
                return initialState
        }
    },
    initialState
)
