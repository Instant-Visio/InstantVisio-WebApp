import { twilioClient } from './twilioClient'
import { RoomId } from '../../../../types/Room'
import { getAppEnv } from '../../../../firebase/env'
import { formatTwilioRoomId } from './twilioUtils'
import { InternalServerError } from '../../../errors/HttpError'

export const createTwilioRoom = async (roomId: RoomId) => {
    const { domain } = getAppEnv()

    const twilioRoomId = formatTwilioRoomId(roomId)
    const room = await twilioClient.video.rooms.create({
        uniqueName: twilioRoomId,
        mediaRegion: 'de1',
        type: 'group',
        statusCallback: `https://${domain}/api/v1-private/webhook/twilioStatusCallback`,
    })

    if (!room) {
        throw new InternalServerError('Error creating premium video call room')
    }

    return {
        sid: room?.sid,
        twilioRoomId,
    }
}
