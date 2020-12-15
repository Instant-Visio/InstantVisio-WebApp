import { createSelector } from 'reselect'
import { RoomId } from '../../types/Room'

export const selectToken = createSelector(
    (state: any) => state.token,
    (token) => token
)

export const selectRoomId = createSelector(
    (state: any) => state.roomId,
    (roomId: RoomId) => roomId
)

export const selectHostName = createSelector(
    (state: any) => state.hostName,
    (hostName: string) => hostName
)
