import * as functions from 'firebase-functions'
import * as jsonWebToken from 'jsonwebtoken'
import { addTokenToUser } from '../db/addTokenToUser'

export const userCreate = functions.auth.user().onCreate(async (user) => {
    const { jwt } = functions.config()
    if (!jwt.key) {
        throw new functions.https.HttpsError(
            'failed-precondition',
            'Missing JWT Key'
        )
    }

    const newJWTToken = jsonWebToken.sign({ uid: user.uid }, jwt.key, {
        algorithm: 'HS256',
    })

    await addTokenToUser(user.uid, newJWTToken)

    return user
})
