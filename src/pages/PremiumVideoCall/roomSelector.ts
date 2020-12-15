import { Room } from './roomReducer'
import { createSelector } from 'reselect'

export const selectRoomId = createSelector(
    (state: any) => state.room,
    (room: Room) => room.roomId
)

export const selectHostName = createSelector(
    (state: any) => state.room,
    (room: Room) => room.hostName
)
