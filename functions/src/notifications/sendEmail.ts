import { EmailNotificationParams } from '../types/Notification'
import * as sgMail from '@sendgrid/mail'
import { logEmailSent } from '../sumologic/sumologic'
import { getSendGridEnv } from '../firebase/env'
import { SendGridEnv } from '../types/SendGridEnv'

export const sendEmailWithCustomEnv = async (
    params: EmailNotificationParams,
    messageBody: string,
    subject: string,
    sendGridEnv: SendGridEnv
) => {
    if (!sendGridEnv) {
        return Promise.reject('Missing SendGrid env')
    }

    sgMail.setApiKey(sendGridEnv.apiKey)

    const msg = {
        to: params.email,
        from: `InstantVisio <${params.emailFrom}>`,
        subject: subject,
        text: messageBody,
        ip_pool_name: sendGridEnv.ipPoolName,
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
        console.log(JSON.stringify(err))
    }
    return Promise.reject('Failed to send email')
}

export const sendEmail = async (
    params: EmailNotificationParams,
    messageBody: string,
    subject: string
) => {
    return sendEmailWithCustomEnv(
        params,
        messageBody,
        subject,
        getSendGridEnv()
    )
}
