import { InvitationDestination } from '../types/InvitationDestination'
import { NotificationContent, NotificationType } from '../types/Notification'
import { getAppEnv } from '../firebase/env'
import { sendNotification } from './sendNotification'
import { RoomId } from '../types/Room'

export interface SendNotificationsResult {
    emailsSent: string[]
    smssSent: string[]
    pushsSent: string[]
}

export const sendNotifications = async (
    destinations: InvitationDestination[],
    notificationContent: NotificationContent,
    roomId: RoomId
): Promise<SendNotificationsResult> => {
    // Just some quick prefilters
    const emailDestinations = destinations.filter(
        (dest) => dest.email && dest.email.length > 4
    )
    const smsDestinations = destinations.filter(
        (dest) => dest.phone && dest.phone.length > 4
    )
    const pushDestinations = destinations.filter(
        (dest) => dest.topic && dest.topic.length > 4
    )

    const emailsSent: string[] = []
    const smssSent: string[] = []
    const pushsSent: string[] = []

    const appEnv = getAppEnv()

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

    for (const pushDest of pushDestinations) {
        if (!pushDest.topic) continue
        try {
            await sendNotification({
                ...notificationContent,
                type: NotificationType.PushNotificationType,
                lang: pushDest.lang,
                topic: pushDest.topic,
                additionalData: {
                    roomId: roomId,
                },
            })
            pushsSent.push(pushDest.topic)
        } catch (error) {
            console.error(error)
        }
    }

    return Promise.resolve({
        emailsSent,
        smssSent,
        pushsSent,
    })
}
