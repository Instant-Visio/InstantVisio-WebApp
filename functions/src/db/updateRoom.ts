import { Room } from '../types/Room'
import { db, serverTimestamp } from '../firebase/firebase'

export const updateRoom = async (room: Room) => {
    await db
        .collection('rooms')
        .doc(room.roomId)
        .set(
            {
                ...room,
                updatedAt: serverTimestamp(),
            },
            { merge: true }
        )
}
