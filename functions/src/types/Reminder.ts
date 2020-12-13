import { InvitationDestination } from './InvitationDestination'
import { firestore } from 'firebase-admin/lib/firestore'
import Timestamp = firestore.Timestamp

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
    sendAt: Timestamp
    destinations: InvitationDestination[]
    hostName: string
    createdAt: Timestamp
    updatedAt: Timestamp
    isSent?: false
}
export type ReminderId = string
