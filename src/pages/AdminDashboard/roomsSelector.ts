import { AppState } from '../../reducers/rootReducer'
import { createSelector } from 'reselect'

const roomsState = (state: AppState) => state.rooms
export interface RoomsState {
    rooms?: any
    createdRoom: {
        id: string
        destinations: {
            phone: number
            email: number
        }
    }
}

export const selectRooms = createSelector(
    roomsState,
    ({ rooms }: RoomsState) => rooms
)

//todo typing
export const selectCreatedRoom = createSelector(
    roomsState,
    ({ rooms, createdRoom }: RoomsState) => {
        const { id: createdRoomId, destinations } = createdRoom
        const room = rooms.find(({ id }) => id === createdRoomId)

        if (room) {
            return {
                ...room,
                destinations,
                hasDestinationSent: Object.values(destinations).reduce(
                    (accu, current) => accu + current,
                    0
                ),
            }
        }

        return room
    }
)
