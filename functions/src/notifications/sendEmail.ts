import { NotificationParams } from '../types/Notification'
import * as sgMail from '@sendgrid/mail'
import { logEmailSent } from '../sumologic/sumologic'

export const sendEmail = async (
    params: NotificationParams,
    messageBody: string,
    subject: string
) => {
    if (!params.sendGridCredentials) {
        return Promise.reject('Missing SendGrid env')
    }

    sgMail.setApiKey(params.sendGridCredentials.apikey)
    const msg = {
        to: params.email,
        from: `InstantVisio <${params.emailFrom}>`,
        subject: subject,
        text: messageBody,
        ip_pool_name: params.sendGridCredentials.ip_pool_name,
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
