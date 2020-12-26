import {
    arrayRemove,
    arrayUnion,
    db,
    deleteField,
    serverTimestamp,
} from '../firebase/firebase'
import { COLLECTIONS } from './constants'
import { GroupNotFoundError } from '../api/errors/HttpError'
import { Group, GroupId, PublicGroup } from '../types/Group'
import { UID } from '../types/uid'
import { Member } from '../types/Member'

export interface GroupEditData {
    id: GroupId
    name?: string
}

export interface DatabaseGroup extends Group {
    membersDetails: Member[]
}

export class GroupDao {
    public static async get(groupId: GroupId): Promise<DatabaseGroup> {
        const documentSnapshot = await db
            .collection(COLLECTIONS.groups)
            .doc(groupId)
            .get()

        if (!documentSnapshot.exists) {
            throw new GroupNotFoundError()
        }

        return <DatabaseGroup>documentSnapshot.data()
    }

    public static async listByUserId(userId: UID): Promise<PublicGroup[]> {
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
        members?: Member[]
    ): Promise<GroupId> {
        const documentReference = await db.collection(COLLECTIONS.groups).add({
            name,
            ownerUserId,
            members: members ? members.map((member) => member.id) : [],
            membersDetails: members || {},
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
        newMembers: Member[]
    ): Promise<void> {
        const memberIds = newMembers.map((member) => member.id)
        const membersDetails = newMembers.reduce(
            (acc: { [key: string]: Member }, member) => {
                acc[`membersDetails.${member.id}`] = member
                return acc
            },
            {}
        )
        await db
            .collection(COLLECTIONS.groups)
            .doc(groupId)
            .update({
                members: arrayUnion(...memberIds),
                ...membersDetails,
                updatedAt: serverTimestamp(),
            })
    }

    public static async removeMembers(
        groupId: GroupId,
        membersToRemove: Member[]
    ): Promise<void> {
        const memberIds = membersToRemove.map((member) => member.id)
        const membersDetails = membersToRemove.reduce(
            (acc: { [key: string]: any }, member) => {
                acc[`membersDetails.${member.id}`] = deleteField()
                return acc
            },
            {}
        )

        await db
            .collection(COLLECTIONS.groups)
            .doc(groupId)
            .update({
                members: arrayRemove(...memberIds),
                ...membersDetails,
                updatedAt: serverTimestamp(),
            })
    }
}
