import produce, { Draft } from 'immer'
import { SIGNOUT } from '../../actions/userActionsTypes'
import { SET_ROOMS } from './roomsActionTypes'
import { RoomsState } from './roomsSelector'

const initialState = {
    rooms: [],
}

export const roomsReducer = produce(
    (draft: Draft<RoomsState>, { type, payload }) => {
        switch (type) {
            case SET_ROOMS:
                draft.rooms = payload.rooms
                break
            case SIGNOUT:
                draft.rooms = []
        }
    },
    initialState
)
