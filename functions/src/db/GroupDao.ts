import {
    arrayRemove,
    arrayUnion,
    db,
    serverTimestamp,
} from '../firebase/firebase'
import { COLLECTIONS } from './constants'
import { GroupNotFoundError } from '../api/errors/HttpError'
import { Group, GroupId, PubicGroup } from '../types/Group'
import { UID } from '../types/uid'

export interface GroupEditData {
    id: GroupId
    name?: string
}

export class GroupDao {
    public static async get(groupId: GroupId): Promise<Group> {
        const documentSnapshot = await db
            .collection(COLLECTIONS.groups)
            .doc(groupId)
            .get()

        if (!documentSnapshot.exists) {
            throw new GroupNotFoundError()
        }

        return <Group>documentSnapshot.data()
    }

    public static async listByUserId(userId: UID): Promise<PubicGroup[]> {
        const querySnapshots = await db
            .collection(COLLECTIONS.groups)
            .where('destinations', 'array-contains', userId)
            .get()

        return querySnapshots.docs.map((doc) => {
            const {
                id,
                name,
                members,
                ownerUserId,
                createdAt,
                updatedAt,
            } = doc.data()

            return {
                id,
                name,
                ownerUserId,
                membersCount: members.length,
                createdAt: createdAt._seconds,
                updatedAt: updatedAt._seconds,
            }
        })
    }

    public static async add(
        ownerUserId: UID,
        name: string,
        members?: UID[]
    ): Promise<GroupId> {
        const documentReference = await db.collection(COLLECTIONS.groups).add({
            name,
            ownerUserId,
            members: members || [],
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
        })
        return documentReference.id
    }

    public static async update(group: GroupEditData): Promise<void> {
        await db
            .collection(COLLECTIONS.groups)
            .doc(group.id)
            .set(
                {
                    ...group,
                    updatedAt: serverTimestamp(),
                },
                { merge: true }
            )
    }

    public static async addMembers(
        groupId: GroupId,
        newMembers: UID[]
    ): Promise<void> {
        await db
            .collection(COLLECTIONS.groups)
            .doc(groupId)
            .update({
                members: arrayUnion(newMembers),
                updatedAt: serverTimestamp(),
            })
    }

    public static async removeMembers(
        groupId: GroupId,
        membersToRemove: UID[]
    ): Promise<void> {
        await db
            .collection(COLLECTIONS.groups)
            .doc(groupId)
            .update({
                members: arrayRemove(membersToRemove),
                updatedAt: serverTimestamp(),
            })
    }
}
