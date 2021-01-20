import produce, { Draft } from 'immer'
import { SIGNOUT } from '../../actions/userActionsTypes'
import { SET_GROUP } from './groupActionTypes'
import { GroupState } from './groupSelector'

const initialState = {
    group : null
}

export const groupReducer = produce(
    (draft: Draft<GroupState>, { type, payload }) => {
        switch (type) {
        case SET_GROUP:
            draft.group = payload.group
            break
        case SIGNOUT:
            return initialState
        }
    },
    initialState
)
