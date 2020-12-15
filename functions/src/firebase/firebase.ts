import admin from 'firebase-admin'
import 'firebase-functions'

admin.initializeApp()

export const db = admin.firestore()
export const serverTimestamp = admin.firestore.FieldValue.serverTimestamp
export const increment = admin.firestore.FieldValue.increment
export type Timestamp = admin.firestore.Timestamp
export const Timestamp = admin.firestore.Timestamp
