export const DEFAULT_ROOM_TYPE = 'twilio-group'
export const COLLECTIONS = {
    rooms: 'rooms',
    users: 'users',
    reminders: 'reminders',
    groups: 'groups',
}
export const SUBSCRIPTIONS = {
    manual: 'manual',
}

export const TEST_ACCOUNTS = {
    premiumUser: {
        id: '',
        email: 'paid-user@instantvisio.com',
        password: 'test-password',
    },
    freeUser: {
        id: '',
        email: 'unpaid-user@instantvisio.com',
        password: 'test-password',
    },
    overQuotaUser: {
        id: '',
        email: 'over-quota-user@instantvisio.com',
        password: 'test-password',
    },
}
