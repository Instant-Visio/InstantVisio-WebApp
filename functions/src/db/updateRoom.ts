import { COLLECTIONS } from './constants'
import { RoomId, RoomSid } from '../types/Room'
import { db, serverTimestamp, Timestamp } from '../firebase/firebase'
import { UID } from '../types/uid'

export interface RoomEditData {
    roomId: RoomId
    roomSid?: RoomSid
    uid?: UID
    password?: string
    startAt?: Timestamp
}

export const updateRoom = async (room: RoomEditData) => {
    await db
        .collection(COLLECTIONS.rooms)
        .doc(room.roomId)
        .set(
            {
                ...room,
                updatedAt: serverTimestamp(),
            },
            { merge: true }
        )
}
