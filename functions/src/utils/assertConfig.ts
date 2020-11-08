import * as functions from 'firebase-functions'
import { JWTKey } from '../types/JWTKey'

export const assertJWTEnv = (): JWTKey => {
    const { jwt } = functions.config()
    if (!jwt.key) {
        throw new functions.https.HttpsError(
            'failed-precondition',
            'Missing JWT Key'
        )
    }
    return jwt
}
