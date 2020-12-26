import { combineReducers } from 'redux'
import { snackbarReducer } from '../components/App/Snackbar/snackbarReducer'
import { SnackbarState } from '../components/App/Snackbar/snackbarSelector'
import { userReducer, UserState } from '../components/App/userReducer'
import { LoginModalState } from '../components/LoginModal/loginModalSelector'
import { roomReducer, RoomState } from '../pages/PremiumVideoCall/roomReducer'
import { loginModalReducer } from '../components/LoginModal/loginModalReducer'

export interface AppState {
    user: UserState
    room: RoomState
    snackbar: SnackbarState
    loginModal: LoginModalState
}

const rootReducer = combineReducers({
    user: userReducer,
    room: roomReducer,
    snackbar: snackbarReducer,
    loginModal: loginModalReducer,
})

export default rootReducer
