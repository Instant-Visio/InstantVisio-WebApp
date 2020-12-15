import * as functions from 'firebase-functions'
import * as jsonWebToken from 'jsonwebtoken'
import { addTokenToUser } from '../db/addTokenToUser'
import { getJWTEnv } from '../firebase/env'
import { updateUserDb } from '../db/userDb'
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
                throw new Error('Test user does not exist')
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

    await addTokenToUser(uid, newJWTToken)

    const userData = getUserData(user)
    await updateUserDb(uid, userData)

    return user
})
