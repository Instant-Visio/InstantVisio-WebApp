export const SHOW_JOIN_GROUP_MODAL = 'SHOW_JOIN_GROUP_MODAL'
export const HIDE_JOIN_GROUP_MODAL = 'HIDE_JOIN_GROUP_MODAL'

interface ShowJoinGroupModalAction {
    type: typeof SHOW_JOIN_GROUP_MODAL
    payload: {}
}

interface HideJoinGroupModalAction {
    type: typeof HIDE_JOIN_GROUP_MODAL
    payload: {}
}

export type JoinGroupModalActionTypes =
    | ShowJoinGroupModalAction
    | HideJoinGroupModalAction
