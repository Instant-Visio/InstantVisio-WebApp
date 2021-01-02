import { Request, Response } from 'express'
import { wrap } from 'async-middleware'
import { seedAuth } from './authSeeds'
import { seedFirestore } from './seedFirestore'
import { TEST_ACCOUNTS } from '../../../db/constants'

export const seeds = wrap(async (req: Request, res: Response) => {
    const authEmulatorUrl = 'localhost:9099'
    const firestoreEmulatorUrl = 'localhost:9099'
    const {
        premiumUser,
        freeUser,
        overQuotaUser,
    } = await seedAuth(authEmulatorUrl, [
        TEST_ACCOUNTS.paidUser,
        TEST_ACCOUNTS.unpaidUser,
        TEST_ACCOUNTS.overQuotaUser,
    ])

    await seedFirestore(firestoreEmulatorUrl, premiumUser)

    res.send({
        status: 'Done 🥳🍪',
        data: {
            premiumUser: {
                id: premiumUser,
                ...TEST_ACCOUNTS.paidUser,
            },
            freeUser: {
                id: freeUser,
                ...TEST_ACCOUNTS.unpaidUser,
            },
            overQuotaUser: {
                id: overQuotaUser,
                ...TEST_ACCOUNTS.overQuotaUser,
            },
        },
    })
})
