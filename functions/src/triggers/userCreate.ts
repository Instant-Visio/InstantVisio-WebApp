import * as functions from 'firebase-functions'
import { db, serverTimestamp } from '../firebase/firebase'
import * as jsonWebToken from 'jsonwebtoken'

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

    await db
        .collection('users')
        .doc(user.uid)
        .set(
            {
                tokens: {
                    [newJWTToken]: {
                        valid: true,
                        createdAt: serverTimestamp(),
                    },
                },
            },
            { merge: true }
        )

    return user
})
