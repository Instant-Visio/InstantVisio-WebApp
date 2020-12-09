import * as functions from 'firebase-functions'
import { getUserToken } from '../db/getUserToken'

export const getToken = functions.https.onCall(async (data, context) => {
    if (!(context.auth && context.auth.token)) {
        throw new functions.https.HttpsError(
            'unauthenticated',
            'User not authentificated.'
        )
    }

    const token = await getUserToken(context.auth.uid)

    return {
        token,
    }
})
