import {
    GroupsActionsTypes,
    SET_GROUPS,
} from './groupsActionTypes'
import { Api } from '../../services/api'
import { showErrorMessage } from '../../components/App/Snackbar/snackbarActions'
import { selectToken } from '../../components/App/userSelector'


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
