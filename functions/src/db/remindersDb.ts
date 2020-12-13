import { InvitationDestination } from '../types/InvitationDestination'
import { RoomId } from '../types/Room'
import { db, serverTimestamp } from '../firebase/firebase'
import { COLLECTIONS } from './constants'
import { Reminder, ReminderId } from '../types/Reminder'

export const getReminderListDb = async (
    roomId: RoomId
): Promise<Reminder[]> => {
    const snapshot = await db
        .collection(COLLECTIONS.reminders)
        .where('roomId', '==', roomId)
        .get()

    return snapshot.docs.map((doc) => {
        const {
            destinations,
            sendTimestamp,
            isSent,
            createdAt,
            updatedAt,
        } = doc.data()
        return {
            id: doc.id,
            destinations,
            sendTimestamp,
            isSent,
            createdAt: createdAt._seconds,
            updatedAt: updatedAt._seconds,
        }
    })
}

export const addReminderDb = async (
    roomId: RoomId,
    sendTimestamp: number,
    destinations: InvitationDestination[]
) => {
    const documentReference = await db.collection(COLLECTIONS.reminders).add({
        roomId,
        sendTimestamp,
        destinations,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        isSent: false,
    })
    return documentReference.id
}

export interface ReminderEditData {
    reminderId: ReminderId
    destinations?: InvitationDestination[]
    sendTimestamp?: number
}

export const updateReminderDb = async (reminder: ReminderEditData) => {
    const { reminderId, ...editData } = reminder
    return db
        .collection(COLLECTIONS.reminders)
        .doc(reminderId)
        .set(
            {
                ...editData,
                updatedAt: serverTimestamp(),
            },
            { merge: true }
        )
}

export const deleteReminderDb = async (reminderId: string) => {
    return db.collection(COLLECTIONS.reminders).doc(reminderId).delete()
}
