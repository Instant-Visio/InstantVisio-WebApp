import { OVHCredentials } from './OVHCredentials'

export interface NotificationParams {
    name: string
    roomUrl: string
    country: string
    lang: string
    email?: string
    phone?: string
    emailFrom?: string
    ovhCredentials?: OVHCredentials
    sendGridCredentials?: {
        apikey: string
        ip_pool_name: string
    }
}

export interface NotificationContent {
    name: string
    roomUrl: string
}
