import * as admin from 'firebase-admin'
import Timestamp = admin.firestore.Timestamp
import { UID } from '../types/uid'

export interface UserData {
    id: UID
    subscription: {
        isActive: boolean
        isQuotaReached: boolean
    }
    tokens: {
        [key: string]: {
            createdAt: Timestamp
            valid: boolean
        }
    }
}
