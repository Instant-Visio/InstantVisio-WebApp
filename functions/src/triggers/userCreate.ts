import * as functions from 'firebase-functions'
import * as jsonWebToken from 'jsonwebtoken'
import { addTokenToUser } from '../db/addTokenToUser'
import { assertJWTEnv } from '../utils/assertConfig'

export const userCreate = functions.auth.user().onCreate(async (user) => {
    const jwtKey = assertJWTEnv()

    const newJWTToken = jsonWebToken.sign({ uid: user.uid }, jwtKey, {
        algorithm: 'HS256',
    })

    await addTokenToUser(user.uid, newJWTToken)

    return user
})
