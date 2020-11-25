import { Room, RoomId } from '../types/Room'
import { db } from '../firebase/firebase'
import { NotFoundError } from '../api/errors/HttpError'

export const getRoom = async (roomId: RoomId): Promise<Room> => {
    const documentSnapshot = await db.collection('rooms').doc(roomId).get()

    if (!documentSnapshot.exists) {
        throw new NotFoundError('Resource does not exist')
    }

    return <Room>documentSnapshot.data()
}
