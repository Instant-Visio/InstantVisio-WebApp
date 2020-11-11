// tslint:disable-next-line:no-implicit-dependencies
import testProto from 'firebase-functions-test'
import { firestoreStub } from '../../testUtils/firestoreStub'

jest.mock('firebase-admin', () => ({
    ...(jest.requireActual('firebase-admin') as {}),
    initializeApp: jest.fn(),
    firestore: () => {
        console.log('called')
        return firestoreStub
    },
}))

const functionTest = testProto()
functionTest.mockConfig({ jwt: { key: '23wr42ewr34' } })
import { authenticateJWTMiddleware } from './authenticateJWTMiddleware'
import {
    ForbiddenError,
    PreconditionFailedError,
    UnauthorizedError,
} from '../errors/HttpError'

describe('authentificateJWTMiddleware', () => {
    const mockNext = jest.fn()
    const mockRes = jest.fn()

    afterEach(() => {
        mockNext.mockClear()
        mockRes.mockClear()
    })

    it('should not be authorized due to missing authorization header', () => {
        expect(() => {
            authenticateJWTMiddleware(
                {
                    headers: {},
                } as any,
                mockRes as any,
                mockNext
            )
        }).toThrowError(UnauthorizedError)
    })

    it('should fail due to authorization header wrongly formatted', () => {
        expect(() => {
            authenticateJWTMiddleware(
                {
                    headers: {
                        authorization: 'Bearer',
                    },
                } as any,
                mockRes as any,
                mockNext
            )
        }).toThrowError(PreconditionFailedError)
    })

    it('should call next with an error due to token wrongly formatted token', () => {
        authenticateJWTMiddleware(
            {
                headers: {
                    authorization: 'Bearer THIS_IS_NOT.A_REAL.TOKEN',
                },
            } as any,
            mockRes as any,
            mockNext
        )
        expect(mockNext.mock.calls.length).toBe(1)
        expect(mockNext.mock.calls[0][0]).toBeInstanceOf(ForbiddenError)
    })

    // TODO : token not valid

    it('should failed because token is invalid', () => {
        const token =
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2OSIsImlhdCI6MTUxNjIzOTAyMn0.MboZ1PQYeouu9wnxfYrnk2XnPAgQBcL177e7bNbBMr0'

        // const snapshot = {
        //     data: () => ({tokens: {
        //             token: {
        //                 valid: false
        //             }
        //         }}),
        //     exists: true
        // }
        // get.mockImplementation(() => Promise.resolve(snapshot))

        authenticateJWTMiddleware(
            {
                headers: {
                    authorization: `Bearer ${token}`,
                },
            } as any,
            mockRes as any,
            mockNext
        )
        expect(mockNext.mock.calls.length).toBe(1)
    })
})
