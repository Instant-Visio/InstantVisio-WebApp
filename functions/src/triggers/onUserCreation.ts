import * as functions from 'firebase-functions'
import * as jsonWebToken from 'jsonwebtoken'
import { addTokenToUser } from '../db/addTokenToUser'
import { getJWTEnv } from '../firebase/env'
import { updateUserDb } from '../db/userDb'
import { SUBSCRIPTIONS } from '../db/constants'

export const onUserCreation = functions.auth.user().onCreate(async (user) => {
    const jwtKey = getJWTEnv()

    const { uid } = user

    const newJWTToken = jsonWebToken.sign({ uid }, jwtKey, {
        algorithm: 'HS256',
    })

    await addTokenToUser(uid, newJWTToken)

    await updateUserDb(uid, {
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
