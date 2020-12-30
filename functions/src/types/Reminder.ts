import { InvitationDestination } from './InvitationDestination'
import { Timestamp } from '../firebase/firebase'
import { RoomId } from './Room'

export interface ReminderResponse {
    id: string
    sendAt: number
    destinations: InvitationDestination[]
    hostName: string
    createdAt: number
    updatedAt: number
    isSent?: false
}
export interface Reminder {
    id: ReminderId
    sendAt: Timestamp
    roomId: RoomId
    destinations: InvitationDestination[]
    hostName: string
    createdAt: Timestamp
    updatedAt: Timestamp
    isSent?: false
}
export type ReminderId = string
