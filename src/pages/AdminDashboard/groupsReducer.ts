import produce, { Draft } from 'immer'
import { SIGNOUT } from '../../actions/userActionsTypes'
import { SET_GROUPS } from './groupsActionTypes'
import { GroupsState } from './groupsSelector'

const initialState = {
    groups: [],
}

export const groupsReducer = produce(
    (draft: Draft<GroupsState>, { type, payload }) => {
        switch (type) {
        case SET_GROUPS:
            draft.groups = payload.groups
            break
        case SIGNOUT:
            return initialState
        }
    },
    initialState
)
