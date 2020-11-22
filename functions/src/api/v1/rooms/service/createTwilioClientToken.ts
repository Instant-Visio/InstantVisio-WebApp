import { Room } from '../../../../types/Room'
import { UID } from '../../../../types/uid'
import * as AccessToken from 'twilio/lib/jwt/AccessToken'
import { getTwilioEnv } from '../../../../firebase/env'

const VideoGrant = AccessToken.VideoGrant
export const TTL_ACCESS_TOKEN_PARTICIPANT_SECONDS = 1440 // 24 hours

export const createTwilioClientToken = (
    participantUID: UID,
    room: Room
): AccessToken => {
    const { sid, apiKeySid, apiKeySecret } = getTwilioEnv()
    const token = new AccessToken(sid, apiKeySid, apiKeySecret, {
        ttl: TTL_ACCESS_TOKEN_PARTICIPANT_SECONDS,
    })
    // @ts-ignore we need to set the identify in the access token
    token.identity = participantUID
    const videoGrant = new VideoGrant({ room: room.id })
    token.addGrant(videoGrant)

    return token
}