import * as functions from 'firebase-functions'
import { logRoomJoined } from '../sumologic/sumologic'

export const roomJoined = functions.https.onCall(() => {
    logRoomJoined()
})
