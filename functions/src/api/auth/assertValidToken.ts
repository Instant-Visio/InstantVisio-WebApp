import { JWTData, JWTToken } from '../../types/JWT'
import { ForbiddenError } from '../errors/HttpError'
import { UserDao } from '../../db/UserDao'

export const assertValidToken = async (
    jwtData: JWTData,
    token: JWTToken
): Promise<void> => {
    const isTokenValid = await UserDao.isTokenValid(jwtData.uid, token)

    if (!isTokenValid) {
        throw new ForbiddenError('Token disabled')
    }
}
