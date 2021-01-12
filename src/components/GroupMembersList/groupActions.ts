import {
    GroupActionsTypes,
    SET_GROUP,
} from './groupActionTypes'
import { Api } from '../../services/api'
import { showErrorMessage } from '../App/Snackbar/snackbarActions'
import { selectToken } from '../App/userSelector'
import { Group, Member, selectGroup } from './groupSelector'
import _ from 'lodash'
import { TFunction } from 'i18next'


export const setGroup = (group: Group): GroupActionsTypes => ({
    type: SET_GROUP,
    payload: {
        group,
    },
})

export const getGroup = (t: TFunction, groupId: string) => async (dispatch, getState) => {
    const token = selectToken(getState())
    const api = new Api(token)

    try {
        const group = await api.getGroup(groupId)
        dispatch(setGroup(group))
    } catch (err) {
        dispatch(showErrorMessage(t('errors.group-fetch')))
    }
}

export const deleteMembers = (t: TFunction, groupId: string, members: Array<Member>) => async (dispatch, getState) => {
    const token = selectToken(getState())
    const group = selectGroup(getState())
    const api = new Api(token)

    if(!group?.members){
        return
    }

    const newGroup = {
        ...group,
        members :  _.differenceBy(group.members, members,'id')
    }
    
    dispatch(setGroup(newGroup))

    try {
        await api.deleteMembers(groupId, members)
        dispatch(getGroup(t, groupId))
    } catch (err) {
        dispatch(setGroup(group))
        dispatch(showErrorMessage(t('errors.delete-members')))
    }
}
