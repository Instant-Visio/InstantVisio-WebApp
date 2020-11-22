export type RoomId = string
export type RoomSid = string

export interface RoomParameters {}

export interface Room {
    roomId: RoomId
    roomSid: RoomSid
    parameters?: RoomParameters
}
