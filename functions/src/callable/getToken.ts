import * as functions from 'firebase-functions'
import { UserDao } from '../db/UserDao'

export const getToken = functions.https.onCall(async (data, context) => {
    if (!(context.auth && context.auth.token)) {
        throw new functions.https.HttpsError(
            'unauthenticated',
            'User not authentificated.'
        )
    }

    const token = await UserDao.getFirstValidToken(context.auth.uid)

    return {
        token,
    }
})
