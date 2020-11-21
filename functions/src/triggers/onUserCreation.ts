import * as functions from 'firebase-functions'
import * as jsonWebToken from 'jsonwebtoken'
import { addTokenToUser } from '../db/addTokenToUser'
import { getJWTEnv } from '../firebase/env'

export const onUserCreation = functions.auth.user().onCreate(async (user) => {
    const jwtKey = getJWTEnv()

    const { uid } = user

    const newJWTToken = jsonWebToken.sign({ uid }, jwtKey, {
        algorithm: 'HS256',
    })

    await addTokenToUser(uid, newJWTToken)

    return user
})
