import * as functions from 'firebase-functions'
import { logCallRating } from '../sumologic/sumologic'
import { isEmpty } from 'lodash'

export const callRating = functions.https.onCall((data) => {
    if (!Number.isInteger(data?.rating)) {
        throw new functions.https.HttpsError(
            'failed-precondition',
            'Input parameters are not valid'
        )
    }

    return logCallRating(data.rating)
})
