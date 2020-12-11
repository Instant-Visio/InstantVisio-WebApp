import { JWTToken } from '../../types/JWT'
import { SetTokenAction, SET_TOKEN } from '../actions/types'

export interface AppState {
    token: JWTToken | null
}

const initialState = {
    token: null,
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
