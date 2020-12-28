import produce, { Draft } from 'immer'
import { HIDE_BACKDROP, SHOW_BACKDROP } from './backdropActionTypes'
import { BackdropState } from './backdropSelector'

const initialState = {
    isDisplayed: true,
}

export const backdropReducer = produce(
    (draft: Draft<BackdropState>, { type, payload }) => {
        switch (type) {
            case SHOW_BACKDROP:
                draft.isDisplayed = true
                break
            case HIDE_BACKDROP:
                draft.isDisplayed = false
                break
        }
    },
    initialState
)
