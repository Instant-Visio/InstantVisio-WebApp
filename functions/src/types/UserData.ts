import * as admin from 'firebase-admin'
import Timestamp = admin.firestore.Timestamp
import { UID } from '../types/uid'

export interface UserData {
    id: UID
    subscriptionActive: boolean
    quotaReached: boolean
    tokens: {
        [key: string]: {
            createdAt: Timestamp
            valid: boolean
        }
    }
}
