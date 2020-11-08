import * as admin from 'firebase-admin'
// import * as functions from 'firebase-functions'
import 'firebase-functions'

admin.initializeApp()

export const db = admin.firestore()
export const serverTimestamp = admin.firestore.FieldValue.serverTimestamp
