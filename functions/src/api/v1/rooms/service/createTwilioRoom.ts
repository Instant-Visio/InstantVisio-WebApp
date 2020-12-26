import { twilioClient } from './twilioClient'
import { RoomId } from '../../../../types/Room'
import { getAppEnv } from '../../../../firebase/env'
import { formatTwilioRoomId } from './twilioUtils'

export const createTwilioRoom = async (roomId: RoomId) => {
    const { domain } = getAppEnv()

    const twilioRoomId = formatTwilioRoomId(roomId)
    const room = await twilioClient.video.rooms.create({
        uniqueName: twilioRoomId,
        mediaRegion: 'de1',
        type: 'group',
        statusCallback: `https://${domain}/api/v1-private/webhook/twilioStatusCallback`,
    })
    return {
        sid: room.sid,
        twilioRoomId,
    }
}
