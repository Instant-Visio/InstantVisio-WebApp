import { RoomId } from '../../types/Room'

export const SET_TOKEN = 'SET_TOKEN'
export const SET_ROOM_ID = 'SET_ROOM_ID'
export const SET_HOST_NAME = 'SET_HOST_NAME'

export interface SetRoomIdAction {
    type: typeof SET_ROOM_ID
    payload: { roomId: RoomId }
}

export interface SetHostNameAction {
    type: typeof SET_HOST_NAME
    payload: { hostName: string }
}

export type ActionTypes = SetRoomIdAction | SetHostNameAction
