import {
    EmailInvitationDestination,
    InvitationDestination,
    PushInvitationDestination,
    SmsInvitationDestination,
} from '../types/InvitationDestination'
import {
    NotificationContent,
    NotificationParams,
    NotificationType,
} from '../types/Notification'
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
    const emailsSent: string[] = await processEmailDestinations(
        notificationContent,
        destinations
    )
    const smssSent: string[] = await processSmsDestinations(
        notificationContent,
        destinations
    )
    const pushsSent: string[] = await processPushDestinations(
        notificationContent,
        destinations,
        roomId
    )

    return Promise.resolve({
        emailsSent,
        smssSent,
        pushsSent,
    })
}

type formatNotificationParamsType = (
    notificationContent: NotificationContent,
    destination: InvitationDestination
) => {
    successField: string
    params: NotificationParams
}

const processDestinations = async (
    notificationContent: NotificationContent,
    destinations: InvitationDestination[],
    formatNotificationParams: formatNotificationParamsType
): Promise<string[]> => {
    const sent = []

    for (const dest of destinations) {
        try {
            const { params, successField } = formatNotificationParams(
                notificationContent,
                dest
            )
            await sendNotification(params)
            sent.push(successField)
        } catch (error) {
            console.error(error)
        }
    }

    return sent
}

const processEmailDestinations = async (
    notificationContent: NotificationContent,
    destinations: InvitationDestination[]
) => {
    const emailDestinations = destinations.filter(
        (dest) => dest.email && dest.email.length > 4
    )

    const appEnv = getAppEnv()

    return processDestinations(
        notificationContent,
        emailDestinations,
        (content: NotificationContent, destination) => {
            const dest = <EmailInvitationDestination>destination
            return {
                params: {
                    ...content,
                    type: NotificationType.EmailNotificationType,
                    lang: dest.lang,
                    email: dest.email,
                    emailFrom: appEnv.emailFrom,
                },
                successField: dest.email,
            }
        }
    )
}

const processSmsDestinations = async (
    notificationContent: NotificationContent,
    destinations: InvitationDestination[]
) => {
    const smsDestinations = destinations.filter(
        (dest) => dest.phone && dest.phone.length > 4
    )

    return processDestinations(
        notificationContent,
        smsDestinations,
        (content: NotificationContent, destination) => {
            const dest = <SmsInvitationDestination>destination
            return {
                params: {
                    ...content,
                    type: NotificationType.SmsNotificationType,
                    country: dest.country,
                    lang: dest.lang,
                    phone: dest.phone,
                },
                successField: dest.phone,
            }
        }
    )
}

const processPushDestinations = async (
    notificationContent: NotificationContent,
    destinations: InvitationDestination[],
    roomId: RoomId
) => {
    const pushDestinations = destinations.filter(
        (dest) => dest.topic && dest.topic.length > 4
    )

    return processDestinations(
        notificationContent,
        pushDestinations,
        (content: NotificationContent, destination) => {
            const dest = <PushInvitationDestination>destination
            return {
                params: {
                    ...content,
                    type: NotificationType.PushNotificationType,
                    lang: dest.lang,
                    topic: dest.topic,
                    additionalData: {
                        roomId: roomId,
                    },
                },
                successField: dest.topic,
            }
        }
    )
}
