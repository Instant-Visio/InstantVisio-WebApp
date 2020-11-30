export interface NotificationParams {
    name: string
    roomUrl: string
    country: string
    lang: string
    email?: string
    phone?: string
    emailFrom?: string
}

export interface NotificationContent {
    name: string
    roomUrl: string
}
