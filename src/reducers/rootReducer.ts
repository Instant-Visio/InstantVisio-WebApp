import { JWTToken } from '../../types/JWT'
import { RoomId } from '../../types/Room'
import {
    ActionTypes,
    SET_HOST_NAME,
    SET_ROOM_ID,
    SET_TOKEN,
} from '../actions/types'

export interface AppState {
    token: JWTToken | null
    roomId: RoomId | null
    hostName: string | null
}

const initialState = {
    token: null,
    roomId: null,
    hostName: null,
}

const rootReducer = (
    state: AppState = initialState,
    action: ActionTypes
): AppState => {
    switch (action.type) {
        case SET_TOKEN:
            return {
                ...state,
                token: action.payload.token,
            }
        case SET_ROOM_ID:
            return {
                ...state,
                roomId: action.payload.roomId,
            }
        case SET_HOST_NAME:
            return {
                ...state,
                hostName: action.payload.hostName,
            }
        default:
            return state
    }
}

export default rootReducer
