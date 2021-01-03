import produce, { Draft } from 'immer'
import { SIGNOUT } from '../../actions/userActionsTypes'
import { SET_ROOMS, ROOM_CREATED, NEW_ROOM } from './roomsActionTypes'
import { RoomsState } from './roomsSelector'

const initialState = {
    rooms: [],
    created: {
        roomId: '',
        roomName: '',
        roomUrl: '',
    },
}

export const roomsReducer = produce(
    (draft: Draft<RoomsState>, { type, payload }) => {
        switch (type) {
            case SET_ROOMS:
                draft.rooms = payload.rooms
                break
            case ROOM_CREATED:
                const { roomId, roomName, roomUrl } = payload
                draft.created = {
                    roomId,
                    roomName,
                    roomUrl,
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
