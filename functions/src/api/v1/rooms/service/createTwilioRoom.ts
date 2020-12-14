import { twilioClient } from './twilioClient'
import { RoomId } from '../../../../types/Room'
import { getAppEnv } from '../../../../firebase/env'

export const createTwilioRoom = async (roomId: RoomId) => {
    const { domain } = getAppEnv()

    const room = await twilioClient.video.rooms.create({
        uniqueName: roomId,
        mediaRegion: 'de1',
        type: 'group',
        statusCallback: `https://${domain}/api/v1-private/webhook/twilioStatusCallback`,
    })
    return room.sid
}
