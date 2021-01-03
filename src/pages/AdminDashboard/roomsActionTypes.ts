export const SET_ROOMS = 'SET_ROOMS'
export const ROOM_CREATED = 'ROOM_CREATED'
export const NEW_ROOM = 'NEW_ROOM'

interface SetRoomsAction {
    type: typeof SET_ROOMS
    payload: {
        rooms: any
    }
}

interface RommCreatedAction {
    type: typeof ROOM_CREATED
    payload: {
        roomId: string
        roomName: string
        roomUrl: string
    }
}

interface NewRoomAction {
    type: typeof NEW_ROOM
}

export type RoomsActionsTypes =
    | SetRoomsAction
    | RommCreatedAction
    | NewRoomAction
