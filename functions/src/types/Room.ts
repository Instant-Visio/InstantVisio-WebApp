import { UID } from './uid'
import { Timestamp } from '../firebase/firebase'
import { InvitationDestination } from './InvitationDestination'

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
    destinations?: InvitationDestination[]
    hostName?: string
    timezone: string
}

export const isStatusEnded = (room?: Room): boolean =>
    room?.status === StatusEnded
export const isStatusUndefined = (room?: Room): boolean => !room?.status
