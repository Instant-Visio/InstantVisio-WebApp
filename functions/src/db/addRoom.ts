import { COLLECTIONS, DEFAULT_ROOM_TYPE } from './constants'
import { RoomId } from '../types/Room'
import { db, serverTimestamp } from '../firebase/firebase'
import { UID } from '../types/uid'

export const addRoom = async (
    userId: UID,
    password: string
): Promise<RoomId> => {
    const documentReference = await db.collection(COLLECTIONS.rooms).add({
        uid: userId,
        password: password,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        service: DEFAULT_ROOM_TYPE,
    })

    return documentReference.id
}
