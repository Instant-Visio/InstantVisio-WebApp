import { Timestamp } from '../firebase/firebase'
import { RoomId } from './Room'

export interface ReminderResponse {
    id: string
    sendAt: number
    createdAt: number
    updatedAt: number
    isSent?: false
}
export interface Reminder {
    id: ReminderId
    sendAt: Timestamp
    roomId: RoomId
    createdAt: Timestamp
    updatedAt: Timestamp
    isSent?: false
}
export type ReminderId = string
