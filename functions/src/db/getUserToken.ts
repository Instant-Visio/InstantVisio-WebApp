import { BadRequestError } from '../api/errors/HttpError'
import { getUser } from './getUser'
import { UID } from '../../../types/uid'
import { JWTToken } from '../../../types/JWT'

export const getUserToken = async (userId: UID): Promise<JWTToken | null> => {
    const userData = await getUser(userId)

    if (userData.tokens) {
        const validTokens = Object.keys(userData.tokens).filter(
            (token) => userData.tokens[token].valid
        )

        if (validTokens.length > 0) {
            return validTokens[0]
        }
    }

    throw new BadRequestError('No available/valid token')
}
