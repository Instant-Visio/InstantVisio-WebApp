import {
    RoomsActionsTypes,
    ROOM_CREATED,
    SET_ROOMS,
    RESET_ROOM_CREATED,
} from './roomsActionTypes'
import { Api } from '../../services/api'
import {
    showErrorMessage,
    showSuccessMessage,
} from '../../components/App/Snackbar/snackbarActions'
import {
    hideBackdrop,
    showBackdrop,
} from '../../components/App/Backdrop/backdropActions'
import { selectToken } from '../../components/App/userSelector'
import { NewEditRoom } from './CreateRoomForm/CreateRoomForm'
import { getUserDetails } from '../../actions/userActions'

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

export const createRoom = (t, room: NewEditRoom, remindAt: number) => async (
    dispatch,
    getState
) => {
    dispatch(showBackdrop())
    const token = selectToken(getState())
    const api = new Api(token)

    try {
        const reminders = remindAt > 0 ? remindAt : null
        const {
            roomId,
            smssSent,
            pushsSent,
            emailsSent,
        } = await api.createRoom(room, reminders)
        dispatch(getRooms(t))
        const { destinations } = room

        dispatch(setRoomCreated(roomId, countDestinations(destinations)))
        if (destinations.length) {
            dispatch(getUserDetails(t))

            if (
                smssSent &&
                pushsSent &&
                emailsSent &&
                !smssSent.length &&
                !pushsSent.length &&
                !emailsSent.length
            ) {
                dispatch(
                    showSuccessMessage(
                        t('errors.rooms-created-no-notification')
                    )
                )
            }
        }
    } catch (err) {
        dispatch(showErrorMessage(t('errors.rooms-create')))
    }

    dispatch(hideBackdrop())
}

export const inviteParticipants = (t, roomId, hostName, destinations) => async (
    dispatch,
    getState
) => {
    dispatch(showBackdrop())
    try {
        const token = selectToken(getState())
        const api = new Api(token)
        await api.inviteParticipants(roomId, hostName, destinations)
        dispatch(showSuccessMessage(t('add-participants-form:invited')))
    } catch (err) {
        dispatch(showErrorMessage(t('add-participants-form:errors.general')))
    }
    dispatch(hideBackdrop())
}

export const resetRoomCreated = () => (dispatch) => {
    dispatch(setResetRoomCreated())
}

export const editRoom = (
    t,
    room: NewEditRoom,
    remindAt: number | null
) => async (dispatch, getState): Promise<void> => {
    dispatch(showBackdrop())
    const token = selectToken(getState())
    const api = new Api(token)

    try {
        await api.editRoom(room, remindAt)
        dispatch(getRooms(t))
        dispatch(showSuccessMessage(t('dashboard:form.messages.saved')))
        return Promise.resolve()
    } catch (err) {
        dispatch(showErrorMessage(t('errors.rooms-edit')))
        return Promise.reject(err)
    } finally {
        dispatch(hideBackdrop())
    }
}
