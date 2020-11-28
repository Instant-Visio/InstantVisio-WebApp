import * as translations from '../translations.json'
import { isEmpty } from 'lodash'
import { NotificationParams } from '../types/Notification'
import { sendEmail } from './sendEmail'
import { sendSms } from './sendSMS'

export const sendNotification = async (params: NotificationParams) => {
    const name = params.name.replace(/(.{20})..+/, '$1…')
    // @ts-ignore
    const langData = translations[params.lang]
    const subject = `${langData.title} ${params.name}`
    const message = `${name} ${langData.Message} ${params.roomUrl}`

    if (!isEmpty(params.email) && !isEmpty(params.sendGridCredentials)) {
        await sendEmail(params, message, subject)
    }
    if (!isEmpty(params.phone) && !isEmpty(params.ovhCredentials)) {
        await sendSms(params, message)
    }
}
