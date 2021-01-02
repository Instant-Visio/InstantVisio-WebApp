import { Api } from '../../services/api'
import {
    showErrorMessage,
    showSuccessMessage,
} from '../App/Snackbar/snackbarActions'
import {
    HIDE_JOIN_GROUP_MODAL,
    SHOW_JOIN_GROUP_MODAL,
    JoinGroupModalActionTypes,
} from './joinGroupModalActionTypes'

export const showJoinGroupModal = (): JoinGroupModalActionTypes => ({
    type: SHOW_JOIN_GROUP_MODAL,
    payload: {},
})

export const hideJoinGroupModal = (): JoinGroupModalActionTypes => ({
    type: HIDE_JOIN_GROUP_MODAL,
    payload: {},
})

export const joinGroup = (t, joinGroupParams) => async (dispatch, getState) => {
    const { groupId, groupPassword, displayName } = joinGroupParams
    const { user: userState } = getState()
    const { token } = userState.user

    try {
        const api = new Api(token)
        await api.subscribeToGroup(groupId, displayName, groupPassword)
        dispatch(showSuccessMessage(t('success', { groupId })))
        setTimeout(() => dispatch(hideJoinGroupModal()), 250)
    } catch (e) {
        console.log('Join group error: ', e)
        dispatch(showErrorMessage(t('error', { groupId })))
    }
}
