import { AppState } from '../../reducers/rootReducer'
import { createSelector } from 'reselect'

export interface Member {
    id: string,
    name: string
}

export interface Group {
    id: string,
    ownerUserId: string,
    name: string,
    createdAt: number,
    updatedAt: number,
    memberCount:  number,
    members?: Array<Member>
}

const groupState = (state: AppState) => state.group

export interface GroupState {
    group?: Group
}

export const selectGroup = createSelector(
    groupState,
    ({ group }: GroupState) => group
)
