import { JWTToken } from '../../types/JWT'
import { SetTokenAction, SET_TOKEN } from '../actions/types'

export interface AppState {
    token: JWTToken
}

const initialState = {
    token: '',
}

const rootReducer = (
    state: AppState = initialState,
    action: SetTokenAction
): AppState => {
    switch (action.type) {
        case SET_TOKEN:
            return {
                ...state,
                token: action.payload.token,
            }
        default:
            return state
    }
}

export default rootReducer
