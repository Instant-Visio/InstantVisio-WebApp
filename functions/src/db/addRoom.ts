import { RoomId } from '../types/Room'
import { db, serverTimestamp } from '../firebase/firebase'
import { UID } from '../types/uid'

export const addRoom = async (
    userId: UID,
    password: string
): Promise<RoomId> => {
    const documentReference = await db.collection('rooms').add({
        uid: userId,
        password: password,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        service: 'twilio-group',
    })

    return documentReference.id
}
