import { SmsNotificationParams } from '../types/Notification'
import ovh from 'ovh'
import { parsePhoneNumberFromString } from 'libphonenumber-js'
import { logSmsSent } from '../sumologic/sumologic'
import { alert } from '../callable/alerts/alert'
import { ALERT_OVH_SMS_QUOTA_REACHED } from '../callable/alerts/alertList'
import * as functions from 'firebase-functions'
import { OVHCredentials } from '../types/OVHCredentials'
import { getOVHEnv } from '../firebase/env'

// To get new credentials, we first need to use this method, then open the given url and authentificate manually
// (mind the expiration delay)
//
// const getNewOVHConsumerKey = (ovhInstance:any) => {
//     ovhInstance.requestPromised('POST', '/auth/credential', {
//         'accessRules': [
//             {'method': 'POST', 'path': '/sms/*/jobs'},
//             {'method': 'GET', 'path': '/sms/*/outgoing'},
//             {'method': 'DELETE', 'path': '/sms/*/outgoing/*'}
//         ]
//     }).then((credential: any) => {
//         console.log('auth success, open the url below to validate them', credential)
//     }).catch((error: any) => {
//         console.log('auth error', error)
//     })
// }

export const sendSmsWithCustomEnv = async (
    params: SmsNotificationParams,
    messageBody: string,
    ovhEnv: OVHCredentials
) => {
    if (!ovhEnv || !params.phone) {
        return Promise.reject('Missing OVH env or phone')
    }
    const ovhInstance = ovh({
        appKey: ovhEnv.appKey,
        appSecret: ovhEnv.appSecret,
        consumerKey: ovhEnv.consumerKey,
    })

    const phoneNumber = parsePhoneNumberFromString(
        params.phone,
        params.country as any
    )

    if (!phoneNumber) {
        console.log(
            `Warn: phone number parsing failed, country: ${params.country}`
        )
        return Promise.reject('Phone number parsing failed')
    }

    return ovhInstance
        .requestPromised('POST', `/sms/${ovhEnv.serviceName}/jobs`, {
            message: messageBody,
            noStopClause: true,
            receivers: [phoneNumber.formatInternational()],
            sender: 'VisioPhone',
            priority: 'high',
            validityPeriod: 30, // 30 min
        })
        .then(() => {
            console.log('sms sent')
            logSmsSent()
        })
        .catch((error: any) => {
            console.error('Fail to send sms', error)
            if (error.error && error.error === 402) {
                alert(ALERT_OVH_SMS_QUOTA_REACHED)
                throw new functions.https.HttpsError(
                    'resource-exhausted',
                    '402'
                )
            }
            throw new functions.https.HttpsError('unknown', error.message)
        })
}

export const sendSms = async (
    params: SmsNotificationParams,
    messageBody: string
) => sendSmsWithCustomEnv(params, messageBody, getOVHEnv())
