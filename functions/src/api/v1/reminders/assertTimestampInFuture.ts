import { firestore } from 'firebase-admin/lib/firestore'
import Timestamp = firestore.Timestamp
import { BadRequestError } from '../../errors/HttpError'

export const assertTimestampInFuture = (timestamp: Timestamp) => {
    console.log(timestamp.toMillis(), Date.now())
    if (timestamp.toMillis() < Date.now()) {
        throw new BadRequestError('Request sendAt is in the past')
    }
}
