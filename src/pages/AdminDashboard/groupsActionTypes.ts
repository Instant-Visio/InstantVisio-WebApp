export const SET_GROUPS = 'SET_GROUPS'

interface SetGroupsAction {
    type: typeof SET_GROUPS;
    payload: {
        groups: any
    };
}

export type GroupsActionsTypes =
    | SetGroupsAction
