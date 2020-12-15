import { combineReducers } from 'redux'
import { userReducer } from '../components/App/userReducer'
import { roomReducer } from '../pages/PremiumVideoCall/roomReducer'

const rootReducer = combineReducers({
    user: userReducer,
    room: roomReducer,
})

export default rootReducer
