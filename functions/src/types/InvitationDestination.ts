export type InvitationLangs =
    | 'en'
    | 'fr'
    | 'de'
    | 'es'
    | 'ro'
    | 'hu'
    | 'it'
    | 'gr'

export interface InvitationDestination {
    email?: string
    phone?: string
    topic?: string
    lang: InvitationLangs
    country: string
}

export interface EmailInvitationDestination extends InvitationDestination {
    email: string
}

export interface SmsInvitationDestination extends InvitationDestination {
    phone: string
}

export interface PushInvitationDestination extends InvitationDestination {
    topic: string
}
