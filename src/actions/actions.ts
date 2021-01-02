import { RoomId } from '../../types/Room'
import { SET_ROOM_ID } from '../actions/types'
import { SET_HOST_NAME } from '../actions/types'

export const setRoomId = (roomId: RoomId | null) => {
    return { type: SET_ROOM_ID, payload: { roomId } }
}

export const setHostName = (hostName: string | null) => {
    return { type: SET_HOST_NAME, payload: { hostName } }
}
