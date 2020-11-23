import { Room, RoomId } from '../types/Room'
import { db } from '../firebase/firebase'
import { UID } from '../types/uid'
import { ForbiddenError, NotFoundError } from '../api/errors/HttpError'

export interface RightsResult {
    roomNotFound: boolean
    hasRights: boolean
}

export const assertRightToEditRoom = async (
    roomId: RoomId,
    userId: UID
): Promise<void> => {
    const documentSnapshot = await db.collection('rooms').doc(roomId).get()

    if (!documentSnapshot.exists) {
        throw new NotFoundError('Resource does not exist')
    }

    const roomData = <Room>documentSnapshot.data()

    if (roomData.uid !== userId) {
        throw new ForbiddenError('Not authorized to edit this resource')
    }
}
