import { InvitationDestination } from '../types/InvitationDestination'
import { NotificationContent, NotificationType } from '../types/Notification'
import { getAppEnv } from '../firebase/env'
import { sendNotification } from './sendNotification'

export interface SendNotificationsResult {
    emailsSent: string[]
    smssSent: string[]
}

export const sendNotifications = async (
    destinations: InvitationDestination[],
    notificationContent: NotificationContent
): Promise<SendNotificationsResult> => {
    // Just some quick prefilters
    const emailDestinations = destinations.filter(
        (dest) => dest.email && dest.email.length > 4
    )
    const smsDestinations = destinations.filter(
        (dest) => dest.phone && dest.phone.length > 4
    )

    const emailsSent: string[] = []
    const smssSent: string[] = []

    const appEnv = getAppEnv()

    if (emailDestinations.length > 0) {
        for (const emailDest of emailDestinations) {
            if (!emailDest.email) continue
            try {
                await sendNotification({
                    ...notificationContent,
                    type: NotificationType.EmailNotificationType,
                    lang: emailDest.lang,
                    email: emailDest.email,
                    emailFrom: appEnv.emailFrom,
                })
                emailsSent.push(emailDest.email)
            } catch (error) {
                console.error(error)
            }
        }
    }

    if (smsDestinations.length > 0) {
        for (const smsDest of smsDestinations) {
            if (!smsDest.phone) continue
            try {
                await sendNotification({
                    ...notificationContent,
                    type: NotificationType.SmsNotificationType,
                    country: smsDest.country,
                    lang: smsDest.lang,
                    phone: smsDest.phone,
                })
                smssSent.push(smsDest.phone)
            } catch (error) {
                console.error(error)
            }
        }
    }

    return Promise.resolve({
        emailsSent,
        smssSent,
    })
}
