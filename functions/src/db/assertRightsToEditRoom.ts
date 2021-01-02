import { RoomId, Room } from '../types/Room'
import { UID } from '../types/uid'
import { ForbiddenError } from '../api/errors/HttpError'
import { RoomDao } from './RoomDao'

export const assertRightToEditRoom = async (
    roomId: RoomId,
    userId: UID
): Promise<Room> => {
    const room = await RoomDao.get(roomId)

    if (room.uid !== userId) {
        throw new ForbiddenError('Not authorized to edit this resource')
    }
    return room
}
