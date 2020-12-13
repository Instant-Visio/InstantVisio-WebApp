import { UserState } from './user'
import { combineReducers } from 'redux'
import user from './user'

export interface State {
    user: UserState
}

export default combineReducers({
    user,
})
