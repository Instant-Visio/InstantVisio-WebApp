import { AppState } from '../../reducers/rootReducer'
import { createSelector } from 'reselect'

const roomsState = (state: AppState) => state.rooms
export interface RoomsState {
    rooms?: any
    created: {
        roomId: string
        roomName: string
        roomUrl: string
    }
}

export const selectRooms = createSelector(
    roomsState,
    ({ rooms }: RoomsState) => rooms
)

export const selectCreatedRoom = createSelector(
    roomsState,
    ({ created }: RoomsState) => created
)
