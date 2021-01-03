import {
    EmailInvitationDestination,
    InvitationDestination,
    PushGroupInvitationDestination,
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
import { RoomDao } from '../db/RoomDao'
import { UserDao } from '../db/UserDao'

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
) => Promise<{
    successField: string
    params: NotificationParams
}>

const processDestinations = async (
    notificationContent: NotificationContent,
    destinations: InvitationDestination[],
    formatNotificationParams: formatNotificationParamsType
): Promise<string[]> => {
    const sent = []

    for (const dest of destinations) {
        try {
            const { params, successField } = await formatNotificationParams(
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
        async (content: NotificationContent, destination) => {
            const dest = <EmailInvitationDestination>destination
            return {
                params: {
                    ...content,
                    type: NotificationType.EmailNotificationType,
                    lang: dest.lang,
                    email: dest.email,
                    emailFrom: appEnv.emailFrom,
                    formatType: content.format,
                    roomStartAt: content.roomStartAt,
                    timezone: content.timezone,
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
        async (content: NotificationContent, destination) => {
            const dest = <SmsInvitationDestination>destination
            return {
                params: {
                    ...content,
                    type: NotificationType.SmsNotificationType,
                    country: dest.country,
                    lang: dest.lang,
                    phone: dest.phone,
                    formatType: content.format,
                    roomStartAt: content.roomStartAt,
                    timezone: content.timezone,
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
        (dest) => dest.groupId && dest.groupId.length > 0
    )

    const room = await RoomDao.get(roomId)

    return processDestinations(
        notificationContent,
        pushDestinations,
        async (content: NotificationContent, destination) => {
            const dest = <PushGroupInvitationDestination>destination
            const tokens = await UserDao.getRegistrationTokensForGroup(
                dest.groupId
            )
            const params: any = {
                ...content,
                type: NotificationType.PushNotificationType,
                lang: dest.lang,
                tokens,
                formatType: content.format,
                roomStartAt: content.roomStartAt,
                additionalData: {
                    roomId: roomId,
                    password: room.password,
                    timezone: content.timezone,
                },
            }
            if (content.timezone) {
                params.timezone = content.timezone
                params.additionalData.timezone = content.timezone
            }
            return {
                params: params,
                successField: dest.groupId,
            }
        }
    )
}
