import { combineReducers } from 'redux'
import { snackbarReducer } from '../components/App/Snackbar/snackbarReducer'
import { SnackbarState } from '../components/App/Snackbar/snackbarSelector'
import { userReducer, UserState } from '../components/App/userReducer'
import { LoginModalState } from '../components/LoginModal/loginModalSelector'
import { roomReducer, RoomState } from '../pages/PremiumVideoCall/roomReducer'
import { loginModalReducer } from '../components/LoginModal/loginModalReducer'
import { modalReducer } from '../components/Modal/modalReducer'
import { BackdropState } from '../components/App/Backdrop/backdropSelector'
import { ModalState } from '../components/Modal/modalSelector'
import { backdropReducer } from '../components/App/Backdrop/backdropReducer'
import { JoinGroupModalState } from '../components/JoinGroup/joinGroupModalSelector'
import { joinGroupModalReducer } from '../components/JoinGroup/joinGroupModalReducer'
import { RoomsState } from '../pages/AdminDashboard/roomsSelector'
import { GroupsState } from '../pages/AdminDashboard/groupsSelector'
import { roomsReducer } from '../pages/AdminDashboard/roomsReducer'
import { AppBarState } from '../components/App/AppBar/redux/appBarSelectors'
import { appBarReducer } from '../components/App/AppBar/redux/appBarReducer'
import { groupsReducer } from '../pages/AdminDashboard/groupsReducer'

export interface AppState {
    user: UserState
    room: RoomState
    snackbar: SnackbarState
    backdrop: BackdropState
    loginModal: LoginModalState
    modal: ModalState
    joinGroupModal: JoinGroupModalState
    rooms: RoomsState
    appBar: AppBarState
    groups: GroupsState
}

const rootReducer = combineReducers({
    user: userReducer,
    room: roomReducer,
    snackbar: snackbarReducer,
    backdrop: backdropReducer,
    loginModal: loginModalReducer,
    modal: modalReducer,
    joinGroupModal: joinGroupModalReducer,
    rooms: roomsReducer,
    appBar: appBarReducer,
    groups: groupsReducer
})

export default rootReducer
