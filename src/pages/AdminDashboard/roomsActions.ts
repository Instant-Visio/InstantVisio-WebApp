import { RoomsActionsTypes, SET_ROOMS } from './roomsActionTypes'
import { Api } from '../../services/api'
import { showErrorMessage } from '../../components/App/Snackbar/snackbarActions'

export const setRooms = (rooms: any): RoomsActionsTypes => ({
    type: SET_ROOMS,
    payload: {
        rooms,
    },
})

export const getRooms = (t) => async (dispatch, getState) => {
    const { user: userState } = getState()
    const { token } = userState.user
    const api = new Api(token)

    try {
        const rooms = await api.getRooms()
        dispatch(setRooms(rooms))
    } catch (err) {
        dispatch(showErrorMessage(t('errors.rooms-fetch')))
    }
}
