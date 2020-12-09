import { UID } from './uid'

export type RoomId = string
export type RoomSid = string

export interface Room {
    id: RoomId
    sid: RoomSid
    uid: UID
    createdAt: number
    updatedAt: number
    password: string
    parameters?: Record<string | number, unknown>
}
