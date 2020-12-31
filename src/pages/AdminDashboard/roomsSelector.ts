import { AppState } from '../../reducers/rootReducer'
import { createSelector } from 'reselect'

export interface RoomsState {
    rooms?: any
}

export const selectRooms = createSelector(
    (state: AppState) => state.rooms,
    (rooms: RoomsState) => rooms
)
