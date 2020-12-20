import { combineReducers } from 'redux'
import { snackbarReducer } from '../components/App/Snackbar/snackbarReducer'
import { SnackbarState } from '../components/App/Snackbar/snackbarSelector'
import { userReducer, UserState } from '../components/App/userReducer'
import { roomReducer, RoomState } from '../pages/PremiumVideoCall/roomReducer'

export interface AppState {
    user: UserState
    room: RoomState
    snackbar: SnackbarState
}

const rootReducer = combineReducers({
    user: userReducer,
    room: roomReducer,
    snackbar: snackbarReducer,
})

export default rootReducer
