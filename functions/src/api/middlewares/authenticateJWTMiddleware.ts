import { Request, Response } from 'express'
import * as jsonWebToken from 'jsonwebtoken'
import { getJWTEnv } from '../../firebase/env'
import { JWTData, JWTToken } from '../../types/JWT'
import {
    ForbiddenError,
    PreconditionFailedError,
    UnauthorizedError,
} from '../errors/HttpError'
import { assertValidToken } from '../auth/assertValidToken'

export const authenticateJWTMiddleware = (
    req: Request,
    res: Response,
    next: Function
) => {
    const jwtKey = getJWTEnv()

    const authHeader = req.headers.authorization

    if (!authHeader) {
        throw new UnauthorizedError('No authorization header')
    }

    const splittedHeader = authHeader.split(' ')

    if (splittedHeader.length < 2) {
        throw new PreconditionFailedError('Malformed authorization header')
    }

    const token = <JWTToken>splittedHeader[1]

    jsonWebToken.verify(
        token,
        jwtKey,
        {
            algorithms: ['HS256'],
        },
        async (err: jsonWebToken.VerifyErrors | null, data: {} | undefined) => {
            if (err || !data) {
                return next(
                    new ForbiddenError('Unable to verify the JWT Token')
                )
            }

            const jwtData: JWTData = <JWTData>data

            try {
                await assertValidToken(jwtData, token)
                res.locals.uid = jwtData.uid
            } catch (error) {
                next(error)
                return
            }
            next()
        }
    )
}
