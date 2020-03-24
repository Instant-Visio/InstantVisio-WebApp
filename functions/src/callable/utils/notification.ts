import * as sgMail from '@sendgrid/mail'
import * as ovh from 'ovh'
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
        from: params.emailFrom,
        subject: `Demande URGENTE de visiophonie de ${params.name}`,
        text: messageBody,
    }

    try {
        const result = await sgMail.send(msg)
        const response = result && result[0]
        if (response.statusCode > 200 && response.statusCode < 400) {
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
        sender: 'InstanVisio',
        priority: "high",
        validityPeriod: 30, // 30 min
    }).then((success: any) => {
        console.log('sms sent')
    }).catch((error: any) => {
        console.error('Fail to send sms', error)
    })
}

// To get new credentials, we first need to use this method, then open the given url and authentificate manually
// (mind the expiration delay)
//
// const getNewOVHConsumerKey = (ovhInstance:any) => {
//     ovhInstance.requestPromised('POST', '/auth/credential', {
//         'accessRules': [
//             {'method': 'POST', 'path': '/sms/*/jobs'}
//         ]
//     }).then((credential: any) => {
//         console.log('auth success', credential)
//     }).catch((error: any) => {
//         console.log('auth error', error)
//     })
// }
