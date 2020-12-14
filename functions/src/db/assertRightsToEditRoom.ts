import { RoomId, Room } from '../types/Room'
import { UID } from '../types/uid'
import { ForbiddenError } from '../api/errors/HttpError'
import { getRoom } from './getRoom'

export const assertRightToEditRoom = async (
    roomId: RoomId,
    userId: UID
): Promise<Room> => {
    const room = await getRoom(roomId)

    if (room.uid !== userId) {
        throw new ForbiddenError('Not authorized to edit this resource')
    }
    return room
}
