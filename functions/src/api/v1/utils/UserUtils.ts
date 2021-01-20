import * as jsonWebToken from 'jsonwebtoken'
import { getJWTEnv } from '../../../firebase/env'
import { UserDao } from '../../../db/UserDao'
import { SUBSCRIPTIONS, TEST_ACCOUNTS } from '../../../db/constants'
import * as admin from 'firebase-admin'
import { isUsingEmulator } from '../../utils/isUsingEmulator'
import { UID } from '../../../types/uid'

export const setNewUserData = async (
    userId: UID,
    user?: admin.auth.UserRecord
): Promise<string> => {
    const token = await generateNewTokenToUser(userId)
    await UserDao.update(userId, getUserData(user))
    return token
}

export const generateNewTokenToUser = async (uid: UID): Promise<string> => {
    const jwtKey = getJWTEnv()
    const newJWTToken = jsonWebToken.sign({ uid }, jwtKey, {
        algorithm: 'HS256',
    })

    await UserDao.addToken(uid, newJWTToken)
    return newJWTToken
}

const getUserData = (user?: admin.auth.UserRecord) => {
    let userData
    if (isUsingEmulator() && user) {
        const { premiumUser, freeUser, overQuotaUser } = TEST_ACCOUNTS
        switch (user.email) {
            case premiumUser.email:
                userData = makeUserData(true, false)
                break
            case freeUser.email:
                userData = makeUserData(false, false)
                break
            case overQuotaUser.email:
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

const makeUserData = (
    isSubscriptionActive: boolean,
    isQuotaReached: boolean
) => ({
    subscription: {
        isActive: isSubscriptionActive,
        isQuotaReached,
        type: SUBSCRIPTIONS.manual,
        quotas: {
            sms: 100,
            email: 100,
            push: 100,
            minutes: 10000,
        },
    },
    usage: {
        sentSMSs: 0,
        sentEmails: 0,
        sentPushs: 0,
    },
})
