import produce, { Draft } from 'immer'
import { SIGNOUT } from '../../actions/userActionsTypes'
import { SET_ROOMS, ROOM_CREATED, RESET_ROOM_CREATED } from './roomsActionTypes'
import { RoomsState } from './roomsSelector'

const initialState = {
    rooms: [],
    createdRoomId: '',
}

export const roomsReducer = produce(
    (draft: Draft<RoomsState>, { type, payload }) => {
        switch (type) {
            case SET_ROOMS:
                draft.rooms = payload.rooms
                break
            case ROOM_CREATED:
                const { roomId } = payload
                draft.createdRoomId = roomId
                break
            case RESET_ROOM_CREATED: {
                draft.createdRoomId = initialState.createdRoomId
                break
            }
            case SIGNOUT:
                return initialState
        }
    },
    initialState
)
