import { UID } from '../../../types/uid'
import { GroupEditForbiddenError } from '../../errors/HttpError'
import { GroupId } from '../../../types/Group'
import { GroupDao } from '../../../db/GroupDao'

export const assertGroupEditAllowed = async (userId: UID, groupId: GroupId) => {
    const group = await GroupDao.get(groupId)
    if (group.ownerUserId !== userId) {
        throw new GroupEditForbiddenError()
    }
}
