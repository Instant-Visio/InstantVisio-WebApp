import * as functions from 'firebase-functions'
import * as jsonWebToken from 'jsonwebtoken'
import { getJWTEnv } from '../firebase/env'
import { SUBSCRIPTIONS } from '../db/constants'
import { UserDao } from '../db/UserDao'

export const onUserCreation = functions.auth.user().onCreate(async (user) => {
    const jwtKey = getJWTEnv()

    const { uid } = user

    const newJWTToken = jsonWebToken.sign({ uid }, jwtKey, {
        algorithm: 'HS256',
    })

    await UserDao.addToken(uid, newJWTToken)

    await UserDao.update(uid, {
        subscription: {
            isActive: false,
            isQuotaReached: false,
            type: SUBSCRIPTIONS.manual,
        },
        usage: {
            sentSMSs: 0,
            sentEmails: 0,
        },
    })

    return user
})
