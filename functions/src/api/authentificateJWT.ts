import * as jsonWebToken from 'jsonwebtoken'
import { Request, Response } from 'express'
import * as functions from 'firebase-functions'
import { VerifyErrors } from 'jsonwebtoken'
import { JWTData } from '../types/JWTData'
import { JWTToken } from '../types/JWTToken'
import { isTokenValidInDb } from './db/isTokenValidInDb'

export const authenticateJWT = (
    req: Request,
    res: Response,
    next: Function
) => {
    const { jwt } = functions.config()
    if (!jwt.key) {
        throw new functions.https.HttpsError(
            'failed-precondition',
            'Missing JWT Key'
        )
    }

    const authHeader = req.headers.authorization

    if (authHeader) {
        const token = <JWTToken>authHeader.split(' ')[1]

        jsonWebToken.verify(
            token,
            jwt.key,
            {
                algorithms: ['HS256'],
            },
            async (err: VerifyErrors | null, data: {} | undefined) => {
                if (err) {
                    return res.sendStatus(403)
                }
                if (!data) {
                    return res.sendStatus(403)
                }
                const jwtData: JWTData = <JWTData>data

                const isTokenValid = await isTokenValidInDb(jwtData, token)

                if (!isTokenValid) {
                    return res.sendStatus(403)
                }

                next()
                return
            }
        )
    } else {
        res.sendStatus(401)
    }
}
