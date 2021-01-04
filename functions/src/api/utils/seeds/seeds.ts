import { Request, Response } from 'express'
import { wrap } from 'async-middleware'
import { seedAuth } from './authSeeds'
import { seedFirestore } from './seedFirestore'
import { TEST_ACCOUNTS } from '../../../db/constants'

export const seeds = wrap(async (req: Request, res: Response) => {
    const authEmulatorUrl = 'localhost:9099'
    const {
        premiumUserId,
        freeUserId,
        overQuotaUserId,
    } = await seedAuth(authEmulatorUrl, [
        TEST_ACCOUNTS.premiumUser,
        TEST_ACCOUNTS.freeUser,
        TEST_ACCOUNTS.overQuotaUser,
    ])

    TEST_ACCOUNTS.premiumUser.id = premiumUserId
    TEST_ACCOUNTS.freeUser.id = freeUserId
    TEST_ACCOUNTS.overQuotaUser.id = overQuotaUserId

    await seedFirestore(TEST_ACCOUNTS)
    const { premiumUser, freeUser, overQuotaUser } = TEST_ACCOUNTS

    res.send({
        status: 'Done 🥳🍪',
        data: {
            premiumUser,
            freeUser,
            overQuotaUser,
        },
    })
})
