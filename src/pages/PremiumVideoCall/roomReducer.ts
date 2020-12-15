import { RoomId } from '../../../types/Room'
import { SET_HOST_NAME, SET_ROOM_ID } from '../../actions/types'

const initialState = {
    room: {
        roomId: '',
        hostName: '',
    },
}

export interface Room {
    roomId: RoomId
    hostName: string
}

export interface RoomState {
    room: Room
}

export const roomReducer = (
    state: RoomState = initialState,
    { payload, type }
) => {
    switch (type) {
        case SET_ROOM_ID:
            return {
                ...state,
                roomId: payload.roomId,
            }
        case SET_HOST_NAME:
            return {
                ...state,
                hostName: payload.hostName,
            }
        default:
            return state
    }
}
