import { COLLECTIONS } from './constants'
import { Room, RoomId } from '../types/Room'
import { db } from '../firebase/firebase'
import { RoomNotFoundError } from '../api/errors/HttpError'

export const getRoom = async (roomId: RoomId): Promise<Room> => {
    const documentSnapshot = await db
        .collection(COLLECTIONS.rooms)
        .doc(roomId)
        .get()

    if (!documentSnapshot.exists) {
        throw new RoomNotFoundError('Resource does not exist')
    }

    return <Room>documentSnapshot.data()
}
