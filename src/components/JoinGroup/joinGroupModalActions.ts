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
