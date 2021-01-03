import * as functions from 'firebase-functions'
import { UserDao } from '../db/UserDao'
import {
    NoAvailableTokenError,
    UserNotFoundError,
} from '../api/errors/HttpError'
import { generateNewTokenToUser } from '../triggers/onUserCreation'
import { UID } from '../types/uid'

export const getToken = functions.https.onCall(async (data, context) => {
    if (!(context.auth && context.auth.token)) {
        throw new functions.https.HttpsError(
            'unauthenticated',
            'User not authentificated.'
        )
    }
    const uid: UID = context.auth.uid

    try {
        return {
            token: await UserDao.getFirstValidToken(context.auth.uid),
        }
    } catch (error) {
        if (
            error instanceof NoAvailableTokenError ||
            error instanceof UserNotFoundError
        ) {
            return {
                token: await generateNewTokenToUser(uid),
            }
        } else {
            throw error
        }
    }
})
