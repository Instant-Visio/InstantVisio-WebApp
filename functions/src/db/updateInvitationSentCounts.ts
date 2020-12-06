import { db, increment, serverTimestamp } from '../firebase/firebase'
import { COLLECTION_USERS } from './constants'
import { UID } from '../types/uid'

export const updateInvitationSentCounts = async (
    userId: UID,
    smssSentCount: number,
    emailsSentCount: number
) => {
    return await db
        .collection(COLLECTION_USERS)
        .doc(userId)
        .set(
            {
                smsSent: increment(smssSentCount),
                emailsSent: increment(emailsSentCount),
                updatedAt: serverTimestamp(),
            },
            { merge: true }
        )
}
