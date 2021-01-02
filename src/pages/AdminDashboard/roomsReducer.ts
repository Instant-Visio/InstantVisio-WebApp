import produce, { Draft } from 'immer'
import { SIGNOUT } from '../../actions/userActionsTypes'
import { SET_ROOMS, ROOM_CREATED, NEW_ROOM } from './roomsActionTypes'
import { RoomsState } from './roomsSelector'

const initialState = {
    rooms: [],
    created: {
        roomId: '',
        roomName: '',
    },
}

export const roomsReducer = produce(
    (draft: Draft<RoomsState>, { type, payload }) => {
        switch (type) {
            case SET_ROOMS:
                draft.rooms = payload.rooms
                break
            case ROOM_CREATED:
                const { roomId, roomName } = payload
                draft.created = {
                    roomId,
                    roomName,
                }
                break
            case NEW_ROOM: {
                draft.created = initialState.created
                break
            }
            case SIGNOUT:
                return initialState
        }
    },
    initialState
)
