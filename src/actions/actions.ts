import { JWTToken } from '../../types/JWT'
import { RoomId } from '../../types/Room'
import { SET_TOKEN } from '../actions/types'
import { SET_ROOM_ID } from '../actions/types'
import { SET_HOST_NAME } from '../actions/types'

export const setToken = (token: JWTToken | null) => {
    return { type: SET_TOKEN, payload: { token } }
}

export const setRoomId = (roomId: RoomId | null) => {
    return { type: SET_ROOM_ID, payload: { roomId } }
}

export const setHostName = (hostName: string | null) => {
    return { type: SET_HOST_NAME, payload: { hostName } }
}
