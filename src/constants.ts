export const EMULATORS = {
    hosts: {
        auth: 'http://localhost:9099/',
        functions: 'http://localhost:5050',
        db: 'localhost:8080',
    },
}

export const TEST_ACCOUNTS = {
    paidUser: {
        email: 'paid-user@instantvisio.com',
        password: 'test-password',
    },
    unpaidUser: {
        email: 'unpaid-user@instantvisio.com',
        password: 'test-password',
    },
    overQuotaUser: {
        email: 'over-quota-user@instantvisio.com',
        password: 'test-password',
    },
}
