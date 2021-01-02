import { Timestamp } from '../firebase/firebase'

export interface ReminderResponse {
    id: string
    sendAt: number
    createdAt: number
    updatedAt: number
    isSent?: false
}
export interface Reminder {
    sendAt: Timestamp
    createdAt: Timestamp
    updatedAt: Timestamp
    isSent?: false
}
export type ReminderId = string
