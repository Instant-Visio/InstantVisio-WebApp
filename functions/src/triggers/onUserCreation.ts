import * as functions from 'firebase-functions'
import * as jsonWebToken from 'jsonwebtoken'
import { getJWTEnv } from '../firebase/env'
import { UserDao } from '../db/UserDao'
import { SUBSCRIPTIONS, TEST_ACCOUNTS } from '../db/constants'
import * as admin from 'firebase-admin'

const makeUserData = (
    isSubscriptionActive: boolean,
    isQuotaReached: boolean
) => ({
    subscription: {
        isActive: isSubscriptionActive,
        isQuotaReached,
        type: SUBSCRIPTIONS.manual,
    },
    usage: {
        sentSMSs: 0,
        sentEmails: 0,
    },
})

const getUserData = (user: admin.auth.UserRecord) => {
    let userData
    if (process.env.FIREBASE_AUTH_EMULATOR_HOST) {
        switch (user.email) {
            case TEST_ACCOUNTS.paidUser.email:
                userData = makeUserData(true, false)
                break
            case TEST_ACCOUNTS.unpaidUser.email:
                userData = makeUserData(false, false)
                break
            case TEST_ACCOUNTS.overQuotaUser.email:
                userData = makeUserData(true, true)
                break
            default:
                // anonymous login case
                userData = makeUserData(false, false)
                break
        }
    } else {
        userData = makeUserData(false, false)
    }

    return userData
}

export const onUserCreation = functions.auth.user().onCreate(async (user) => {
    const jwtKey = getJWTEnv()
    const { uid } = user

    const newJWTToken = jsonWebToken.sign({ uid }, jwtKey, {
        algorithm: 'HS256',
    })

    await UserDao.addToken(uid, newJWTToken)
    await UserDao.update(uid, getUserData(user))

    return user
})
