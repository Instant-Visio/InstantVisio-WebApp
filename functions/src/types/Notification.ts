import { Timestamp } from '../firebase/firebase'

export enum NotificationType {
    SmsNotificationType = 1,
    EmailNotificationType,
    PushNotificationType,
}
export enum NotificationFormatType {
    Now = 1,
    Scheduled,
}

export interface BaseNotificationParams {
    name: string
    roomUrl: string
    lang: string
    type: NotificationType
    formatType: NotificationFormatType
    roomStartAt?: Timestamp
    timezone?: string
}

export interface SmsNotificationParams extends BaseNotificationParams {
    type: NotificationType.SmsNotificationType
    country: string
    phone: string
}

export interface EmailNotificationParams extends BaseNotificationParams {
    type: NotificationType.EmailNotificationType
    email: string
    emailFrom: string
}

export interface PushNotificationParams extends BaseNotificationParams {
    type: NotificationType.PushNotificationType
    tokens: string[]
    channelId: NotificationChannelId
    additionalData: {
        [key: string]: string
    }
}

export enum NotificationChannelId {
    Reminder = 'visio-call-reminders',
    Now = 'visio-call-notifications',
}

export type NotificationParams =
    | SmsNotificationParams
    | EmailNotificationParams
    | PushNotificationParams

export interface NotificationContent {
    name: string
    roomUrl: string
    format: NotificationFormatType
    roomStartAt?: Timestamp
    timezone?: string
}
