import * as functions from 'firebase-functions'
import * as sgMail from '@sendgrid/mail'
import * as ovh from 'ovh'
import {logEmailSent, logSmsSent} from '../../sumologic/sumologic'
import {parsePhoneNumberFromString} from 'libphonenumber-js'

export interface NotificationParams {
    name: string,
    email: string,
    phone: string,
    roomUrl: string,
    country: string,
    emailFrom: string,
    ovhCredentials: {
        consumerkey: string,
        appsecret: string,
        appkey: string,
        servicename: string
    },
    sendGridCredentials: {
        apikey: string
    }
}

export const sendEmail = async (params: NotificationParams, messageBody: string) => {
    sgMail.setApiKey(params.sendGridCredentials.apikey)
    const msg = {
        to: params.email,
        from: `InstantVisio <${params.emailFrom}>`,
        subject: `Demande URGENTE de visiophonie de ${params.name}`,
        text: messageBody
    }

    try {
        const result = await sgMail.send(msg)
        const response = result && result[0]
        if (response.statusCode > 200 && response.statusCode < 400) {
            logEmailSent()
            return Promise.resolve()
        }
        console.log(`Fail to send email for room ${params.roomUrl}`, response.statusCode, response.statusMessage, response.body)
    } catch (err) {
        console.error(err)
    }
    return Promise.reject("Failed to send email")
}

export const sendSms = async (params: NotificationParams, messageBody: string) => {
    const ovhInstance = ovh({
        appKey: params.ovhCredentials.appkey,
        appSecret: params.ovhCredentials.appsecret,
        consumerKey: params.ovhCredentials.consumerkey
    })

    const phoneNumber = parsePhoneNumberFromString(params.phone, params.country as any)

    if (!phoneNumber) {
        console.log(`Warn: phone number parsing failed, country: ${params.country}`)
        return Promise.reject('Phone number parsing failed')
    }

    return ovhInstance.requestPromised('POST', `/sms/${params.ovhCredentials.servicename}/jobs`, {
        message: messageBody,
        noStopClause: true,
        receivers: [phoneNumber.formatInternational()],
        sender: 'VisioPhone',
        priority: "high",
        validityPeriod: 30, // 30 min
    }).then((result: any) => {
        console.log('sms sent')
        logSmsSent()
    }).catch((error: any) => {
        console.error('Fail to send sms', error)
        if(error.error  && error.error === 402) {
            throw new functions.https.HttpsError("resource-exhausted","402")
        }
        throw new functions.https.HttpsError("unknown", error.message)
    })
}

// To get new credentials, we first need to use this method, then open the given url and authentificate manually
// (mind the expiration delay)
//
// const getNewOVHConsumerKey = (ovhInstance:any) => {
//     ovhInstance.requestPromised('POST', '/auth/credential', {
//         'accessRules': [
//             {'method': 'POST', 'path': '/sms/*/jobs'},
//             {'method': 'DELETE', 'path': '/sms/*/outgoing/*'}
//         ]
//     }).then((credential: any) => {
//         console.log('auth success, open the url below to validate them', credential)
//     }).catch((error: any) => {
//         console.log('auth error', error)
//     })
// }
