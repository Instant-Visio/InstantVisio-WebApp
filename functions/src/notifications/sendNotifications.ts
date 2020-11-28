import { InvitationDestination } from '../types/InvitationDestination'
import { NotificationContent } from '../types/Notification'
import { OVHCredentials } from '../types/OVHCredentials'
import { SendGridEnv } from '../types/SendGridEnv'
import { getAppEnv } from '../firebase/env'
import { sendNotification } from './sendNotification'

export interface SendNotificationsResult {
    emailsSent: string[]
    smssSent: string[]
}

export const sendNotifications = async (
    destinations: InvitationDestination[],
    notificationContent: NotificationContent,
    ovhCredentials?: OVHCredentials,
    sendGridEnv?: SendGridEnv
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
                    country: emailDest.country,
                    lang: emailDest.lang,
                    email: emailDest.email,
                    ovhCredentials: ovhCredentials,
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
                    country: smsDest.country,
                    lang: smsDest.lang,
                    phone: smsDest.phone,
                    sendGridCredentials: sendGridEnv,
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
