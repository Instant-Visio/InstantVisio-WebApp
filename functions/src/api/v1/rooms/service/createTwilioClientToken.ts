import { TwilioRoomId } from '../../../../types/Room'
import { UID } from '../../../../types/uid'
import * as AccessToken from 'twilio/lib/jwt/AccessToken'
import { getTwilioEnv } from '../../../../firebase/env'

const VideoGrant = AccessToken.VideoGrant
export const TTL_ACCESS_TOKEN_PARTICIPANT_SECONDS = 14400 // 4 hours

export const createTwilioClientToken = (
    participantUID: UID,
    twilioRoomId: TwilioRoomId,
    participantName: string
): AccessToken => {
    const { sid, apiKeySid, apiKeySecret } = getTwilioEnv()
    const token = new AccessToken(sid, apiKeySid, apiKeySecret, {
        ttl: TTL_ACCESS_TOKEN_PARTICIPANT_SECONDS,
    })
    // @ts-ignore we need to set the identify in the access token
    token.identity = participantName
    const videoGrant = new VideoGrant({ room: twilioRoomId })
    token.addGrant(videoGrant)

    return token
}
