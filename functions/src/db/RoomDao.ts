import { Room, RoomId, RoomSid } from '../types/Room'
import { db, serverTimestamp, Timestamp } from '../firebase/firebase'
import { COLLECTIONS, DEFAULT_ROOM_TYPE } from './constants'
import { RoomNotFoundError } from '../api/errors/HttpError'
import { UID } from '../types/uid'

type Response = Pick<Room, 'id' | 'createdAt' | 'updatedAt' | 'startAt'>
export interface RoomEditData {
    id: RoomId
    sid?: RoomSid
    uid?: UID
    password?: string
    startAt?: Timestamp
    hideChatbot?: boolean
}

export class RoomDao {
    public static async get(roomId: RoomId): Promise<Room> {
        const documentSnapshot = await db
            .collection(COLLECTIONS.rooms)
            .doc(roomId)
            .get()

        if (!documentSnapshot.exists) {
            throw new RoomNotFoundError('Resource does not exist')
        }

        return <Room>documentSnapshot.data()
    }

    public static async listByUserId(
        userId: UID,
        startingAfter?: number
    ): Promise<(Response | null)[]> {
        let query = await db
            .collection(COLLECTIONS.rooms)
            .where('uid', '==', userId)

        if (startingAfter) {
            query = query
                .where('startAt', '>', new Date(startingAfter * 1000))
                .orderBy('startAt', 'asc')
        }

        const results = await query.orderBy('createdAt', 'desc').get()

        return results.docs.map((doc) => {
            const {
                roomId,
                createdAt,
                updatedAt,
                startAt,
                name,
                hideChatbot,
            } = doc.data()
            const room = {
                id: roomId,
                name,
                createdAt: createdAt._seconds,
                updatedAt: updatedAt._seconds,
                startAt,
                hideChatbot,
            }

            if (startAt) {
                room.startAt = startAt._seconds
            }
            return room
        })
    }

    public static async add(
        userId: UID,
        password: string,
        startAt: Timestamp,
        hideChatbot: boolean
    ): Promise<RoomId> {
        const documentReference = await db.collection(COLLECTIONS.rooms).add({
            uid: userId,
            password: password,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
            service: DEFAULT_ROOM_TYPE,
            startAt,
            hideChatbot,
        })

        return documentReference.id
    }

    public static async set(
        userId: UID,
        roomId: RoomId,
        password: string,
        startAt: Timestamp,
        hideChatbot: boolean
    ): Promise<RoomId> {
        await db.collection(COLLECTIONS.rooms).doc(roomId).set({
            uid: userId,
            password: password,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
            service: DEFAULT_ROOM_TYPE,
            startAt,
            hideChatbot,
        })

        return roomId
    }

    public static async update(room: RoomEditData): Promise<void> {
        await db
            .collection(COLLECTIONS.rooms)
            .doc(room.id)
            .set(
                {
                    ...room,
                    updatedAt: serverTimestamp(),
                },
                { merge: true }
            )
    }
}
