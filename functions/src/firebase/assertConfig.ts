import * as functions from 'firebase-functions'
import { JWTKey } from '../types/JWT'
import { InternalServerError } from '../api/errors/HttpError'

export const getJWTEnv = (): JWTKey => {
    const { jwt } = functions.config()
    if (!jwt.key) {
        throw new InternalServerError('Missing JWT Key')
    }
    return jwt.key
}
