import { combineReducers } from 'redux'
import { userReducer, UserState } from '../components/App/userReducer'
import { roomReducer, RoomState } from '../pages/PremiumVideoCall/roomReducer'

export interface AppState {
    user: UserState
    room: RoomState
}

const rootReducer = combineReducers({
    user: userReducer,
    room: roomReducer,
})

export default rootReducer
