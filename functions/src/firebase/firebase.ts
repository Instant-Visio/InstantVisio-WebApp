import admin from 'firebase-admin'
import 'firebase-functions'

admin.initializeApp()

export const db = admin.firestore()
export const serverTimestamp = admin.firestore.FieldValue.serverTimestamp
