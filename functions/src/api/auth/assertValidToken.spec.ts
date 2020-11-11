// tslint:disable-next-line
import '../../testUtils/mockFirebaseAdminAndFunctions'
import { firestoreGet } from '../../testUtils/firestoreStub'
import { JWTData } from '../../types/JWT'
import { assertValidToken } from './assertValidToken'
import { ForbiddenError } from '../errors/HttpError'

describe('assertValidToken', () => {
    const token = 'tokenValue'
    const jwtData: JWTData = {
        uid: '69',
        iat: 1544455,
    }

    it('should not assert because token is valid in DB', async () => {
        const snapshot = {
            data: () => ({
                tokens: {
                    [token]: {
                        valid: true,
                    },
                },
            }),
            exists: true,
        }
        firestoreGet.mockImplementation(() => Promise.resolve(snapshot))

        const result = await assertValidToken(jwtData, token)

        expect(result).toBeUndefined()
    })

    it('should not assert because token is valid in DB', async () => {
        const snapshot = {
            data: () => ({}),
            exists: true,
        }
        firestoreGet.mockImplementation(() => Promise.resolve(snapshot))

        try {
            await assertValidToken(jwtData, token)
        } catch (error) {
            expect(error).toBeInstanceOf(ForbiddenError)
        }
    })
})
