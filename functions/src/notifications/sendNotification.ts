import * as translations from '../translations.json'
import {
    BaseNotificationParams,
    EmailNotificationParams,
    NotificationFormatType,
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
    const { subject, message } = getContent(params)
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

export const getContent = (
    params: BaseNotificationParams
): {
    subject: string
    message: string
} => {
    const name = params.name.replace(/(.{20})..+/, '$1…')
    switch (params.formatType) {
        case NotificationFormatType.Scheduled: {
            // @ts-ignore
            const langData = translations.scheduled[params.lang]
            const message = langData.Message.replace('{NAME}', name)
                .replace('{DATE}', params.roomStartAt?.toDate().toUTCString())
                .replace('{URL}', params.roomUrl)
            return {
                subject: `${langData.title} ${params.name}`,
                message,
            }
        }
        default:
        case NotificationFormatType.Now: {
            // @ts-ignore
            const langData = translations.now[params.lang]
            const subject = `${langData.title} ${params.name}`
            const message = `${name} ${langData.Message} ${params.roomUrl}`
            return {
                subject,
                message,
            }
        }
    }
}
