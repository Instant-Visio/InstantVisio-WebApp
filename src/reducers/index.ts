const initialState = {
    token: '',
}

const rootReducer = (state = initialState, action) => {
    if (action.type === 'setToken') {
        const { token } = action
        return {
            ...state,
            token,
        }
    }
    return state
}

export default rootReducer
