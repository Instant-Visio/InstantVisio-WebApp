import * as functions from 'firebase-functions'
import { JWTKey } from '../types/JWT'
import { InternalServerError } from '../api/errors/HttpError'
import { TwilioEnv } from '../types/TwilioEnv'

export const getJWTEnv = (): JWTKey => {
    const { jwt } = functions.config()
    if (!jwt.key) {
        throw new InternalServerError('Missing JWT Key')
    }
    return jwt.key
}

export const getTwilioEnv = (): TwilioEnv => {
    const { twilio } = functions.config()
    if (
        !twilio.sid ||
        !twilio.authtoken ||
        !twilio.apikeysid ||
        !twilio.apikeysecret
    ) {
        throw new InternalServerError(
            'Missing Twilio sid or authtoken or apikeysid or apikeysecret'
        )
    }
    return {
        sid: twilio.sid,
        authToken: twilio.authtoken,
        apiKeySid: twilio.apikeysid,
        apiKeySecret: twilio.apikeysecret,
    }
}
