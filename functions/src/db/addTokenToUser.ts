import { UID } from '../types/uid'
import { db, serverTimestamp } from '../firebase/firebase'
import { JWTToken } from '../types/JWT'
import { COLLECTIONS } from './constants'

export const addTokenToUser = async (
    userId: UID,
    token: JWTToken
): Promise<void> => {
    await db
        .collection(COLLECTIONS.users)
        .doc(userId)
        .set(
            {
                tokens: {
                    [token]: {
                        valid: true,
                        createdAt: serverTimestamp(),
                    },
                },
            },
            { merge: true }
        )
}
