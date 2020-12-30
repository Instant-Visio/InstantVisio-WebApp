import { RoomsActionsTypes, SET_ROOMS } from './roomsActionTypes'
import { Api } from '../../services/api'
import { showErrorMessage } from '../../components/App/Snackbar/snackbarActions'
import {
    hideBackdrop,
    showBackdrop,
} from '../../components/App/Backdrop/backdropActions'

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

export const createRoom = (t, roomName, hostName, destinations) => async (
    dispatch,
    getState
) => {
    dispatch(showBackdrop())
    const { user: userState } = getState()
    const { token } = userState.user
    const api = new Api(token)

    try {
        await api.createRoom(roomName, hostName, destinations)
        dispatch(getRooms(t))
    } catch (err) {
        dispatch(showErrorMessage(t('errors.rooms-create')))
    }

    dispatch(hideBackdrop())
}

export const editRoom = (t, roomId, roomName, hostName, destinations) => async (
    dispatch,
    getState
) => {
    dispatch(showBackdrop())
    const { user: userState } = getState()
    const { token } = userState.user
    const api = new Api(token)

    try {
        await api.editRoom(roomId, roomName, hostName, destinations)
        dispatch(getRooms(t))
    } catch (err) {
        dispatch(showErrorMessage(t('errors.rooms-edit')))
    }

    dispatch(hideBackdrop())
}
