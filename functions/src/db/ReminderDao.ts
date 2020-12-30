import { InvitationDestination } from '../types/InvitationDestination'
import { RoomId } from '../types/Room'
import { db, serverTimestamp, Timestamp } from '../firebase/firebase'
import { COLLECTIONS } from './constants'
import { Reminder, ReminderId, ReminderResponse } from '../types/Reminder'
import { ReminderNotFoundError } from '../api/errors/HttpError'

export class ReminderDao {
    public static async listByRoomId(roomId: RoomId): Promise<Reminder[]> {
        const snapshot = await db
            .collection(COLLECTIONS.reminders)
            .where('roomId', '==', roomId)
            .get()

        return snapshot.docs.map((doc) => {
            const {
                destinations,
                hostName,
                sendAt,
                isSent,
                createdAt,
                updatedAt,
            } = doc.data()
            return {
                id: doc.id,
                destinations,
                hostName,
                sendAt: sendAt.seconds,
                isSent,
                createdAt: createdAt.seconds,
                updatedAt: updatedAt.seconds,
            }
        })
    }

    public static async listBetween(from: Date, to: Date): Promise<Reminder[]> {
        const snapshot = await db
            .collection(COLLECTIONS.reminders)
            .where('isSent', '==', false)
            .where('sentAt', '>=', from)
            .where('sentAt', '<', to)
            .get()

        return snapshot.docs.map((doc) => {
            const {
                destinations,
                hostName,
                sendAt,
                isSent,
                roomId,
                createdAt,
                updatedAt,
            } = doc.data()
            return {
                id: doc.id,
                roomId,
                destinations,
                hostName,
                sendAt: sendAt.seconds,
                isSent,
                createdAt: createdAt.seconds,
                updatedAt: updatedAt.seconds,
            }
        })
    }

    public static async get(reminderId: ReminderId): Promise<ReminderResponse> {
        const snapshot = await db
            .collection(COLLECTIONS.reminders)
            .doc(reminderId)
            .get()

        if (!snapshot.exists) {
            throw new ReminderNotFoundError('Resource does not exist')
        }

        const {
            destinations,
            hostName,
            sendAt,
            isSent,
            createdAt,
            updatedAt,
        } = <Reminder>snapshot.data()
        return {
            id: snapshot.id,
            destinations,
            hostName,
            sendAt: sendAt.seconds,
            isSent,
            createdAt: createdAt.seconds,
            updatedAt: updatedAt.seconds,
        }
    }

    public static async add(
        roomId: RoomId,
        sendAt: Timestamp,
        destinations: InvitationDestination[],
        hostName: string
    ): Promise<ReminderId> {
        const documentReference = await db
            .collection(COLLECTIONS.reminders)
            .add({
                roomId,
                sendAt,
                destinations,
                hostName,
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp(),
                isSent: false,
            })
        return documentReference.id
    }

    public static async update(reminder: ReminderEditData) {
        const { reminderId, ...editData } = reminder
        await db
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

    public static async delete(reminderId: string): Promise<void> {
        await db.collection(COLLECTIONS.reminders).doc(reminderId).delete()
    }
}

export interface ReminderEditData {
    reminderId: ReminderId
    hostName?: string
    destinations?: InvitationDestination[]
    sendAt?: Timestamp
}
