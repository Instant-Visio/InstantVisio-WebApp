import { COLLECTION_ROOMS } from './constants'
import { RoomId } from '../../../types/Room'
import { db } from '../firebase/firebase'

export const doesRoomExist = async (roomId: RoomId): Promise<boolean> => {
    const documentSnapshot = await db
        .collection(COLLECTION_ROOMS)
        .doc(roomId)
        .get()

    return documentSnapshot.exists
}
