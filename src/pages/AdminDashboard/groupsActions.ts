import {
    GroupsActionsTypes,
    SET_GROUPS,
} from './groupsActionTypes'
import { Api } from '../../services/api'
import { showErrorMessage } from '../../components/App/Snackbar/snackbarActions'
import { selectToken } from '../../components/App/userSelector'
import {
    hideBackdrop,
    showBackdrop,
} from '../../components/App/Backdrop/backdropActions'
import { Group } from '../../components/CreateGroup/CreateGroupForm'


export const setGroups = (groups: any): GroupsActionsTypes => ({
    type: SET_GROUPS,
    payload: {
        groups,
    },
})

export const getGroups = (t) => async (dispatch, getState) => {
    const token = selectToken(getState())
    const api = new Api(token)

    try {
        const groups = await api.getGroups()
        dispatch(setGroups(groups))
    } catch (err) {
        dispatch(showErrorMessage(t('errors.groups-fetch')))
    }
}

export const createGroup = (t, group: Group) => async (
    dispatch,
    getState
) => {
    dispatch(showBackdrop())
    const token = selectToken(getState())
    const api = new Api(token)

    try {
        await api.createGroup(group)
        dispatch(getGroups(t))
    } catch (err) {
        dispatch(showErrorMessage(t('errors.rooms-create')))
    }

    dispatch(hideBackdrop())
}
