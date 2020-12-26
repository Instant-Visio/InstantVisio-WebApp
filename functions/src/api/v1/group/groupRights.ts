import { UID } from '../../../types/uid'
import {
    GroupEditForbiddenError,
    GroupReadForbiddenError,
} from '../../errors/HttpError'
import { GroupId } from '../../../types/Group'
import { GroupDao } from '../../../db/GroupDao'

export const assertGroupEditAllowed = async (userId: UID, groupId: GroupId) => {
    const group = await GroupDao.get(groupId)
    if (group.ownerUserId !== userId) {
        throw new GroupEditForbiddenError()
    }
}

export const assertGroupReadAllowed = async (
    userId: UID,
    groupId: GroupId
): Promise<{
    isOwner: boolean
}> => {
    const group = await GroupDao.get(groupId)

    if (group.members.includes(userId)) {
        return {
            isOwner: group.ownerUserId === userId,
        }
    }
    throw new GroupReadForbiddenError()
}
