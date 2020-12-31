import { RoomsActionsTypes, SET_ROOMS } from './roomsActionTypes'
import { Api } from '../../services/api'
import { showErrorMessage } from '../../components/App/Snackbar/snackbarActions'
import {
    hideBackdrop,
    showBackdrop,
} from '../../components/App/Backdrop/backdropActions'
import { selectToken } from '../../components/App/userSelector'
import { Room } from './CreateRoomForm'

export const setRooms = (rooms: any): RoomsActionsTypes => ({
    type: SET_ROOMS,
    payload: {
        rooms,
    },
})

export const getRooms = (t) => async (dispatch, getState) => {
    const token = selectToken(getState())
    const api = new Api(token)

    try {
        const rooms = await api.getRooms()
        console.log('Rooms: ', rooms)
        dispatch(setRooms(rooms))
    } catch (err) {
        dispatch(showErrorMessage(t('errors.rooms-fetch')))
    }
}

export const createRoom = (t, room: Room) => async (dispatch, getState) => {
    dispatch(showBackdrop())
    const token = selectToken(getState())
    const api = new Api(token)

    try {
        await api.createRoom(room)
        dispatch(getRooms(t))
    } catch (err) {
        dispatch(showErrorMessage(t('errors.rooms-create')))
    }

    dispatch(hideBackdrop())
}

export const editRoom = (t, room: Room) => async (dispatch, getState) => {
    dispatch(showBackdrop())
    const token = selectToken(getState())
    const api = new Api(token)

    try {
        await api.editRoom(room)
        dispatch(getRooms(t))
    } catch (err) {
        dispatch(showErrorMessage(t('errors.rooms-edit')))
    }

    dispatch(hideBackdrop())
}
