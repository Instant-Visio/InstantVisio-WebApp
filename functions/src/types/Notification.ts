export enum NotificationType {
    SmsNotificationType = 1,
    EmailNotificationType,
    PushNotificationType,
}

export interface BaseNotificationParams {
    name: string
    roomUrl: string
    lang: string
    type: NotificationType
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
    topic: string
    additionalData: {
        [key: string]: string
    }
}

export interface NotificationContent {
    name: string
    roomUrl: string
}
