import { RoomId } from '../types/Room'
import { db } from '../firebase/firebase'

export const doesRoomExist = async (roomId: RoomId): Promise<boolean> => {
    const documentSnapshot = await db.collection('rooms').doc(roomId).get()

    return documentSnapshot.exists
}
