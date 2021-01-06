import { AppState } from '../../reducers/rootReducer'
import { createSelector } from 'reselect'

export interface Group {
    id: string,
    ownerUserId: string,
    name: string,
    createdAt: number,
    updatedAt: number,
    memberCount:  number
}

const groupsState = (state: AppState) => state.groups
export interface GroupsState {
    groups?: any
}

export const selectGroups = createSelector(
    groupsState,
    ({ groups }: GroupsState) => groups
)