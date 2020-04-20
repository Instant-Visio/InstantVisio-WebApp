import * as sgMail from '@sendgrid/mail'
import { logEmailSent } from '../../sumologic/sumologic'
import { sendSmsViaOVH } from './sms/ovh'
import { sendSmsViaTwilio } from './sms/twilio'

export interface OVHCredentials {
    consumerkey: string
    appsecret: string
    appkey: string
    servicename: string
}

export interface NotificationParams {
    name: string
    email: string
    phone: string
    roomUrl: string
    country: string
    emailFrom: string
    lang: string
    ovhCredentials: OVHCredentials
    sendGridCredentials: {
        apikey: string
    }
}

export const sendEmail = async (
    params: NotificationParams,
    messageBody: string,
    subject: string
) => {
    sgMail.setApiKey(params.sendGridCredentials.apikey)
    const msg = {
        to: params.email,
        from: `InstantVisio <${params.emailFrom}>`,
        subject: subject,
        text: messageBody,
    }

    try {
        const result = await sgMail.send(msg)
        const response = result && result[0]
        if (response.statusCode > 200 && response.statusCode < 400) {
            logEmailSent()
            return Promise.resolve()
        }
        console.log(
            `Fail to send email for room ${params.roomUrl}`,
            response.statusCode,
            response.statusMessage,
            response.body
        )
    } catch (err) {
        console.error(err)
    }
    return Promise.reject('Failed to send email')
}

export const sendSms = async (
    params: NotificationParams,
    messageBody: string
) => {
    return sendSmsViaOVH(params, messageBody).catch((error) => {
        if (error.code === 'resource-exhausted') {
            console.warn('OVH SMS Exhausted, fallbacking to twilio')
            return sendSmsViaTwilio(params, messageBody)
        }
        return error
    })
}
