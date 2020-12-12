import { db, increment, serverTimestamp } from '../firebase/firebase'
import { COLLECTION_USERS } from './constants'
import { UID } from '../types/uid'

export const updateInvitationSentCounts = async (
    userId: UID,
    smssSentCount: number,
    emailsSentCount: number
) => {
    return db
        .collection(COLLECTION_USERS)
        .doc(userId)
        .set(
            {
                sentEmails: increment(smssSentCount),
                sentSMSs: increment(emailsSentCount),
                updatedAt: serverTimestamp(),
            },
            { merge: true }
        )
}
