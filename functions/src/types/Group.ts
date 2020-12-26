import { UID } from './uid'
import { Timestamp } from '../firebase/firebase'

export type GroupId = string

export interface Group {
    id: GroupId
    name: string
    ownerUserId: UID
    members: UID[]
    createdAt: Timestamp
    updatedAt: Timestamp
}

export interface PublicGroup {
    id: GroupId
    name: string
    ownerUserId: UID
    membersCount: number
    createdAt: number
    updatedAt: number
}
