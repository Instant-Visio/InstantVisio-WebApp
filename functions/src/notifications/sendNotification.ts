import * as translations from '../translations.json'
import {
    EmailNotificationParams,
    NotificationType,
    PushNotificationParams,
    SmsNotificationParams,
} from '../types/Notification'
import { sendEmail } from './sendEmail'
import { sendSms } from './sendSMS'
import { sendPush } from './sendPush'

export const sendNotification = async (
    params:
        | SmsNotificationParams
        | EmailNotificationParams
        | PushNotificationParams
) => {
    const name = params.name.replace(/(.{20})..+/, '$1…')
    // @ts-ignore
    const langData = translations[params.lang]
    const subject = `${langData.title} ${params.name}`
    const message = `${name} ${langData.Message} ${params.roomUrl}`

    if (params.type === NotificationType.EmailNotificationType) {
        await sendEmail(params, message, subject)
    }
    if (params.type === NotificationType.SmsNotificationType) {
        await sendSms(params, message)
    }
    if (params.type === NotificationType.PushNotificationType) {
        await sendPush(params, message, subject)
    }
}
