import produce, { Draft } from 'immer'
import { SIGNOUT } from '../../actions/userActionsTypes'
import { SET_ROOMS, ROOM_CREATED, RESET_ROOM_CREATED } from './roomsActionTypes'
import { RoomsState } from './roomsSelector'

const initialState = {
    rooms: [],
    createdRoom: {
        id: '',
        destinations: {
            email: 0,
            phone: 0,
        },
    },
}

export const roomsReducer = produce(
    (draft: Draft<RoomsState>, { type, payload }) => {
        switch (type) {
            case SET_ROOMS:
                draft.rooms = payload.rooms
                break
            case ROOM_CREATED:
                const { roomId, destinations } = payload
                draft.createdRoom.id = roomId
                draft.createdRoom.destinations = destinations

                break
            case RESET_ROOM_CREATED: {
                draft.createdRoom = initialState.createdRoom
                break
            }
            case SIGNOUT:
                return initialState
        }
    },
    initialState
)
