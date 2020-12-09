import { JWTData, JWTToken } from '../../../../types/JWT'
import { isTokenValidInDb } from '../../db/isTokenValidInDb'
import { ForbiddenError } from '../errors/HttpError'

export const assertValidToken = async (
    jwtData: JWTData,
    token: JWTToken
): Promise<void> => {
    const isTokenValid = await isTokenValidInDb(jwtData, token)

    if (!isTokenValid) {
        throw new ForbiddenError('Token disabled')
    }
}
