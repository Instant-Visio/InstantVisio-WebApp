import { COLLECTION_ROOMS, DEFAULT_ROOM_TYPE } from './constants'
import { RoomId } from '../../../types/Room'
import { db, serverTimestamp } from '../firebase/firebase'
import { UID } from '../../../types/uid'

export const setRoom = async (
    userId: UID,
    roomId: RoomId,
    password: string
): Promise<RoomId> => {
    await db.collection(COLLECTION_ROOMS).doc(roomId).set({
        uid: userId,
        password: password,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        service: DEFAULT_ROOM_TYPE,
    })

    return roomId
}
