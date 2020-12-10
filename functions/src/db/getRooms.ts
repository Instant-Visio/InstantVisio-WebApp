import { COLLECTION_ROOMS } from './constants'
import { UID } from '../../../types/uid'
import { Room } from '../../../types/Room'
import { db } from '../firebase/firebase'

type Response = Pick<Room, 'id' | 'createdAt' | 'updatedAt'>

export const getRooms = async (userId: UID): Promise<(Response | null)[]> => {
    const query = await db
        .collection(COLLECTION_ROOMS)
        .where('uid', '==', userId)
        .orderBy('createdAt', 'desc')

    const results = await query.get()

    return results.docs.map((doc) => {
        const { roomId, createdAt, updatedAt } = doc.data()
        return {
            id: roomId,
            createdAt: createdAt._seconds,
            updatedAt: updatedAt._seconds,
        }
    })
}
