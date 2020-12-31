export const SET_ROOMS = 'SET_ROOMS'

interface SetRoomsAction {
    type: typeof SET_ROOMS
    payload: {
        rooms: any
    }
}

export type RoomsActionsTypes = SetRoomsAction
