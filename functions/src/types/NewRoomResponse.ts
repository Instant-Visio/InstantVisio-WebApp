import { RoomId, RoomSid } from './Room'

export interface NewRoomResponse {
    roomId: RoomId
    roomSid: RoomSid
    roomUrl: string
}
