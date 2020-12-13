import { InvitationDestination } from '../types/InvitationDestination'
import { RoomId } from '../types/Room'
import { db, serverTimestamp } from '../firebase/firebase'
import { COLLECTIONS } from './constants'
import { Reminder, ReminderId, ReminderResponse } from '../types/Reminder'
import { firestore } from 'firebase-admin/lib/firestore'
import Timestamp = firestore.Timestamp
import { ReminderNotFoundError } from '../api/errors/HttpError'

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
            sendAt,
            isSent,
            createdAt,
            updatedAt,
        } = doc.data()
        return {
            id: doc.id,
            destinations,
            sendAt: sendAt.seconds,
            isSent,
            createdAt: createdAt.seconds,
            updatedAt: updatedAt.seconds,
        }
    })
}

export const getReminderDb = async (
    reminderId: ReminderId
): Promise<ReminderResponse> => {
    const snapshot = await db
        .collection(COLLECTIONS.reminders)
        .doc(reminderId)
        .get()

    if (!snapshot.exists) {
        throw new ReminderNotFoundError('Resource does not exist')
    }

    const { destinations, sendAt, isSent, createdAt, updatedAt } = <Reminder>(
        snapshot.data()
    )
    return {
        id: snapshot.id,
        destinations,
        sendAt: sendAt.seconds,
        isSent,
        createdAt: createdAt.seconds,
        updatedAt: updatedAt.seconds,
    }
}

export const addReminderDb = async (
    roomId: RoomId,
    sendAt: Timestamp,
    destinations: InvitationDestination[]
) => {
    const documentReference = await db.collection(COLLECTIONS.reminders).add({
        roomId,
        sendAt,
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
    sendAt?: Timestamp
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
