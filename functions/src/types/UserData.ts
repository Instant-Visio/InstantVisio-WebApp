import * as admin from 'firebase-admin'
import Timestamp = admin.firestore.Timestamp

export interface UserData {
    tokens: {
        [key: string]: {
            createdAt: Timestamp
            valid: boolean
        }
    }
}
