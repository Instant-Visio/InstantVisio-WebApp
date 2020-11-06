export const reducer = (state, action) => {
    switch (action.type) {
        case 'resize':
            return {
                isMobile: action.width <= 500,
            }
        default:
            return state
    }
}
