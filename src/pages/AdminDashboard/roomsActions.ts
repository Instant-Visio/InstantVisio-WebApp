import {
    RoomsActionsTypes,
    ROOM_CREATED,
    SET_ROOMS,
    RESET_ROOM_CREATED,
} from './roomsActionTypes'
import { Api } from '../../services/api'
import { showErrorMessage } from '../../components/App/Snackbar/snackbarActions'
import {
    hideBackdrop,
    showBackdrop,
} from '../../components/App/Backdrop/backdropActions'
import { selectToken } from '../../components/App/userSelector'
import { Room } from './CreateRoomForm/CreateRoomForm'

export const setRooms = (rooms: any): RoomsActionsTypes => ({
    type: SET_ROOMS,
    payload: {
        rooms,
    },
})

const setRoomCreated = (roomId: string, destinations): RoomsActionsTypes => ({
    type: ROOM_CREATED,
    payload: {
        roomId,
        destinations,
    },
})

const setResetRoomCreated = (): RoomsActionsTypes => ({
    type: RESET_ROOM_CREATED,
})

export const getRooms = (t) => async (dispatch, getState) => {
    const token = selectToken(getState())
    const api = new Api(token)

    try {
        const rooms = await api.getRooms()
        dispatch(setRooms(rooms))
    } catch (err) {
        dispatch(showErrorMessage(t('errors.rooms-fetch')))
    }
}

const countDestinations = (destinations): Record<'phone' | 'email', number> => {
    return destinations.reduce((accu, current) => {
        const key = Object.keys(current)[0]
        accu[key] = (accu[key] || 0) + 1
        return accu
    }, {})
}

export const createRoom = (t, room: Room, remindAt: number) => async (
    dispatch,
    getState
) => {
    dispatch(showBackdrop())
    const token = selectToken(getState())
    const api = new Api(token)

    try {
        const { roomId } = await api.createRoom(room)
        dispatch(getRooms(t))

        if (remindAt) dispatch(createReminder(t, roomId, remindAt))
        const { destinations } = room

        dispatch(setRoomCreated(roomId, countDestinations(destinations)))
    } catch (err) {
        dispatch(showErrorMessage(t('errors.rooms-create')))
    }

    dispatch(hideBackdrop())
}

export const resetRoomCreated = () => (dispatch) => {
    dispatch(setResetRoomCreated())
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

export const createReminder = (t, roomId, remindAt) => async (
    dispatch,
    getState
) => {
    dispatch(showBackdrop())
    const token = selectToken(getState())
    const api = new Api(token)

    try {
        await api.createReminder(roomId, remindAt)
    } catch (err) {
        dispatch(showErrorMessage(t('errors.reminders-create')))
    }

    dispatch(hideBackdrop())
}
