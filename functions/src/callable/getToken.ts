import * as functions from 'firebase-functions'
import { UserDao } from '../db/UserDao'
import {
    NoAvailableTokenError,
    UserNotFoundError,
} from '../api/errors/HttpError'
import {
    generateNewTokenToUser,
    setNewUserData,
} from '../api/v1/utils/UserUtils'
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
            token: await UserDao.getFirstValidToken(uid),
        }
    } catch (error) {
        if (error instanceof UserNotFoundError) {
            return {
                token: await setNewUserData(uid),
            }
        } else if (error instanceof NoAvailableTokenError) {
            return {
                token: await generateNewTokenToUser(uid),
            }
        } else {
            throw error
        }
    }
})
