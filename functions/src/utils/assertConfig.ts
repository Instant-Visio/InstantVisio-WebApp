import * as functions from 'firebase-functions'
import { JWTKey } from '../types/JWT'

export const getJWTEnv = (): JWTKey => {
    const { jwt } = functions.config()
    if (!jwt.key) {
        throw new functions.https.HttpsError(
            'failed-precondition',
            'Missing JWT Key'
        )
    }
    return jwt
}
