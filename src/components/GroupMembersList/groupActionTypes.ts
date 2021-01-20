export const SET_GROUP = 'SET_GROUP'

interface SetGroupAction {
    type: typeof SET_GROUP;
    payload: {
        group: any
    };
}

export type GroupActionsTypes =
    | SetGroupAction
