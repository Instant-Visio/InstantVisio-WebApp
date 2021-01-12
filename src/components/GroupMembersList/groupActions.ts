import {
    GroupActionsTypes,
    SET_GROUP,
} from './groupActionTypes'
import { Api } from '../../services/api'
import { showErrorMessage } from '../App/Snackbar/snackbarActions'
import { selectToken } from '../App/userSelector'
import { selectGroups } from '../../pages/AdminDashboard/groupsSelector'



export const setGroup = (group: any): GroupActionsTypes => ({
    type: SET_GROUP,
    payload: {
        group,
    },
})

export const getGroup = (t, groupId) => async (dispatch, getState) => {
    const token = selectToken(getState())
    const api = new Api(token)

    try {
        const group = await api.getGroup(groupId)
        dispatch(setGroup(group))
    } catch (err) {
        dispatch(showErrorMessage(t('errors.group-fetch')))
    }
}

export const deleteMembers = (t, groupId, members) => async (dispatch, getState) => {
    const token = selectToken(getState())
    const api = new Api(token)

    try {
        await api.deleteMembers(groupId, members)
        dispatch(getGroup(t, groupId))
    } catch (err) {
        dispatch(showErrorMessage(t('errors.delete-members')))
    }
}
