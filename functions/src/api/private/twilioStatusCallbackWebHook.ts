import { wrap } from 'async-middleware'
import { Request, Response } from 'express'
import * as twilio from 'twilio'
import { getTwilioEnv } from '../../firebase/env'
import { ForbiddenError, UnauthorizedError } from '../errors/HttpError'
import { getPublicRequestURL } from '../utils/getPublicRequestURL'
import { increment } from '../../firebase/firebase'
import { RoomDao } from '../../db/RoomDao'
import { UserDao } from '../../db/UserDao'

const PARTICIPANT_DISCONNECTED_EVENT = 'participant-disconnected'

export const twilioStatusCallbackWebHook = wrap(
    async (req: Request, res: Response) => {
        assertTwilioRequestValid(req)

        const { StatusCallbackEvent, RoomName, ParticipantDuration } = req.body
        const month = new Date().getMonth() + 1

        switch (StatusCallbackEvent) {
            case PARTICIPANT_DISCONNECTED_EVENT:
                const room = await RoomDao.get(RoomName)
                const participantDuration = parseInt(ParticipantDuration)
                await UserDao.update(room.uid, {
                    usage: {
                        participantSeconds: increment(participantDuration),
                    },
                    subscription: {
                        [month]: {
                            usage: {
                                participantSeconds: increment(
                                    participantDuration
                                ),
                            },
                        },
                    },
                })
                break
            default:
                break
        }

        res.send()
    }
)

const assertTwilioRequestValid = (req: Request) => {
    const { authToken } = getTwilioEnv()
    const twilioSignature = req.header('X-Twilio-Signature')
    const url = getPublicRequestURL(req)
    if (!twilioSignature) {
        throw new UnauthorizedError('Missing Twilio Signature')
    }
    if (!twilio.validateRequest(authToken, twilioSignature, url, req.body)) {
        throw new ForbiddenError('Twilio request integrity verification failed')
    }
}
