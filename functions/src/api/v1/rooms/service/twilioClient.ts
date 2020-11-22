import * as twilio from 'twilio'
import { getTwilioEnv } from '../../../../firebase/env'

const twilioEnv = getTwilioEnv()
export const twilioClient = twilio(twilioEnv.sid, twilioEnv.authToken)
