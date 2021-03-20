import { Room, RoomId, RoomSid, RoomStatus, TwilioRoomId } from '../types/Room'
import { db, serverTimestamp, Timestamp } from '../firebase/firebase'
import { COLLECTIONS, DEFAULT_ROOM_TYPE } from './constants'
import { BadRequestError, RoomNotFoundError } from '../api/errors/HttpError'
import { UID } from '../types/uid'
import { getAppEnv } from '../firebase/env'
import { InvitationDestination } from '../types/InvitationDestination'
import { GroupId } from '../types/Group'

type Response = Pick<Room, 'id' | 'createdAt' | 'updatedAt' | 'startAt'>

export interface RoomEditData {
    id: RoomId
    twilioRoomId?: TwilioRoomId
    status?: RoomStatus
    sid?: RoomSid
    uid?: UID
    password?: string
    startAt?: Timestamp
    name?: string
    hideChatbot?: boolean
    hostName?: string
    destinations?: InvitationDestination[]
    groupsIds?: string[]
    timezone?: string
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
        startingAfter?: number,
        status?: RoomStatus
    ): Promise<(Response | null)[]> {
        return await RoomDao.listBy(undefined, userId, startingAfter, status)
    }

    public static async listByGroupsIds(
        groupsIds: GroupId[],
        startingAfter?: number,
        status?: RoomStatus
    ): Promise<(Response | null)[]> {
        return await RoomDao.listBy(groupsIds, undefined, startingAfter, status)
    }

    private static async listBy(
        groupsIds?: GroupId[],
        userId?: UID,
        startingAfter?: number,
        status?: RoomStatus
    ): Promise<(Response | null)[]> {
        const collectionRef = await db.collection(COLLECTIONS.rooms)

        let query: FirebaseFirestore.Query
        if (userId) {
            query = collectionRef.where('uid', '==', userId)
        } else if (groupsIds && groupsIds.length > 0) {
            query = collectionRef.where(
                'groupsIds',
                'array-contains-any',
                groupsIds
            )
        } else {
            throw new BadRequestError('BadRequest to get the rooms')
        }

        if (status) {
            query = query.where('status', '==', status)
        }

        if (startingAfter) {
            query = query
                .where('startAt', '>', new Date(startingAfter * 1000))
                .orderBy('startAt', 'asc')
        }

        const results = await query.orderBy('createdAt', 'desc').get()

        return results.docs.map((doc) => {
            const {
                id,
                createdAt,
                updatedAt,
                startAt,
                password,
                destinations,
                name,
                hideChatbot,
                timezone,
                hostName,
            } = doc.data()
            const room = {
                id,
                name,
                createdAt: createdAt._seconds,
                updatedAt: updatedAt._seconds,
                startAt,
                hideChatbot,
                password,
                destinations,
                roomUrl: formatRoomUrl(id, password),
                timezone,
                hostName,
            }

            if (startAt) {
                room.startAt = startAt._seconds
            }
            return room
        })
    }

    public static async add({
        userId,
        password,
        startAt,
        hideChatbot,
        timezone,
    }: {
        userId: UID
        password: string
        startAt: Timestamp
        hideChatbot: boolean
        timezone: string
    }): Promise<RoomId> {
        const documentReference = await db.collection(COLLECTIONS.rooms).add({
            uid: userId,
            password: password,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
            service: DEFAULT_ROOM_TYPE,
            startAt,
            hideChatbot,
            timezone,
        })

        return documentReference.id
    }

    public static async set({
        userId,
        roomId,
        password,
        startAt,
        hideChatbot,
        timezone,
    }: {
        userId: UID
        roomId: RoomId
        password: string
        startAt: Timestamp
        hideChatbot: boolean
        timezone: string
    }): Promise<RoomId> {
        await db.collection(COLLECTIONS.rooms).doc(roomId).set({
            uid: userId,
            password: password,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
            service: DEFAULT_ROOM_TYPE,
            startAt,
            hideChatbot,
            timezone,
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

    public static async delete(roomId: RoomId) {
        await db.collection(COLLECTIONS.rooms).doc(roomId).delete()
    }
}

export const formatRoomUrl = (roomId: RoomId, roomPassword: string) => {
    const { domain, protocol } = getAppEnv()
    return `${protocol}://${domain}/premium-video/room/${roomId}?passcode=${roomPassword}`
}
