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
        throw new Error('Missing SendGrid env')
    }

    sgMail.setApiKey(sendGridEnv.apiKey)

    const msg = {
        to: params.email,
        from: `InstantVisio <${params.emailFrom}>`,
        subject: subject,
        text: messageBody,
        // ip_pool_name: sendGridEnv.ipPoolName,
    }

    try {
        const [response] = await sgMail.send(msg)
        if (isResponseSuccessful(response)) {
            logEmailSent()
            return
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
    throw new Error('Failed to send email')
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

const isResponseSuccessful = (response: { statusCode: number }) =>
    response.statusCode > 200 && response.statusCode < 400
