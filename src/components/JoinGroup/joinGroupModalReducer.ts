import produce, { Draft } from 'immer'
import {
    SHOW_JOIN_GROUP_MODAL,
    HIDE_JOIN_GROUP_MODAL,
} from './joinGroupModalActionTypes'
import { JoinGroupModalState } from './joinGroupModalSelector'

const initialState = {
    isDisplayed: false,
}

export const joinGroupModalReducer = produce(
    (draft: Draft<JoinGroupModalState>, { type, payload }) => {
        switch (type) {
            case SHOW_JOIN_GROUP_MODAL:
                draft.isDisplayed = true
                break
            case HIDE_JOIN_GROUP_MODAL:
                draft.isDisplayed = false
                break
        }
    },
    initialState
)
