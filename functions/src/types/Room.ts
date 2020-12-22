import { UID } from './uid'
import { Timestamp } from '../firebase/firebase'

export type RoomId = string
export type RoomSid = string
export type TwilioRoomId = string
export const StatusEmpty = ''
export const StatusEnded = 'ended'
export const StatusCreated = 'created'
export type RoomStatus =
    | typeof StatusEmpty
    | typeof StatusEnded
    | typeof StatusCreated

export interface Room {
    id: RoomId
    sid: RoomSid
    twilioRoomId: TwilioRoomId
    uid: UID
    createdAt: Timestamp
    updatedAt: Timestamp
    password: string
    startAt: Timestamp
    hideChatbot: boolean
    parameters?: Record<string | number, unknown>
    status?: RoomStatus
}
