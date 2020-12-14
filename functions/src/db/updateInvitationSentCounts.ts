import { db, increment, serverTimestamp } from '../firebase/firebase'
import { COLLECTIONS } from './constants'
import { UID } from '../types/uid'

export const updateInvitationSentCounts = async (
    userId: UID,
    smssSentCount: number,
    emailsSentCount: number
) => {
    const month = new Date().getMonth() + 1

    const sentInvitations = {
        sentEmails: increment(smssSentCount),
        sentSMSs: increment(emailsSentCount),
    }

    return db
        .collection(COLLECTIONS.users)
        .doc(userId)
        .set(
            {
                usage: sentInvitations,
                subscription: {
                    [month]: {
                        usage: sentInvitations,
                    },
                },
                updatedAt: serverTimestamp(),
            },
            { merge: true }
        )
}
