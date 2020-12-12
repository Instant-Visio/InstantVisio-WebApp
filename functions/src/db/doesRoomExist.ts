import { COLLECTIONS } from './constants'
import { RoomId } from '../types/Room'
import { db } from '../firebase/firebase'

export const doesRoomExist = async (roomId: RoomId): Promise<boolean> => {
    const documentSnapshot = await db
        .collection(COLLECTIONS.rooms)
        .doc(roomId)
        .get()

    return documentSnapshot.exists
}
