import * as admin from 'firebase-admin'
import Timestamp = admin.firestore.Timestamp
import { UID } from './uid'

export interface User {
    id: UID
    subscription: {
        isActive: boolean
        isQuotaReached: boolean
    }
    usage: {
        sentSMSs: number
        sentEmails: number
    }
    updatedAt: Timestamp
    tokens: {
        [key: string]: {
            createdAt: Timestamp
            valid: boolean
        }
    }
}

export interface UserResponse {
    id: UID
    subscription: {
        isActive: boolean
        isQuotaReached: boolean
    }
    sentSMSs: number
    sentEmails: number
    updatedAt: number
}
