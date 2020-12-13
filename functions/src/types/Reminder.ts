import { InvitationDestination } from './InvitationDestination'

export interface Reminder {
    sendTimestamp: number
    destinations: InvitationDestination[]
    createdAt: number
    updatedAt: number
    isSent?: false
}
export type ReminderId = string
