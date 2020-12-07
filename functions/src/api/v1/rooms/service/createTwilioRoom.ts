import { twilioClient } from './twilioClient'
import { RoomId } from '../../../../../../types/Room'

export const createTwilioRoom = async (roomId: RoomId) => {
    const room = await twilioClient.video.rooms.create({
        uniqueName: roomId,
        mediaRegion: 'de1',
        type: 'group',
    })
    return room.sid
}
