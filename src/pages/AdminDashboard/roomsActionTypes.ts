export const SET_ROOMS = 'SET_ROOMS'
export const ROOM_CREATED = 'ROOM_CREATED'
export const RESET_ROOM_CREATED = 'RESET_ROOM_CREATED'

interface SetRoomsAction {
    type: typeof SET_ROOMS
    payload: {
        rooms: any
    }
}

interface RoomCreatedAction {
    type: typeof ROOM_CREATED
    payload: {
        roomId: string
        destinations: {
            phone: number
            email: number
        }
    }
}

interface ResetRoomCreatedAction {
    type: typeof RESET_ROOM_CREATED
}

export type RoomsActionsTypes =
    | SetRoomsAction
    | RoomCreatedAction
    | ResetRoomCreatedAction
