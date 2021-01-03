import { AppState } from '../../reducers/rootReducer'
import { createSelector } from 'reselect'

const roomsState = (state: AppState) => state.rooms
export interface RoomsState {
    rooms?: any
    createdRoomId: string
}

export const selectRooms = createSelector(
    roomsState,
    ({ rooms }: RoomsState) => rooms
)

export const selectCreatedRoom = createSelector(
    roomsState,
    ({ rooms, createdRoomId }: RoomsState) =>
        rooms.find(({ id }) => id === createdRoomId)
)
