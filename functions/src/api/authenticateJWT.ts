import * as jsonWebToken from 'jsonwebtoken'
import { Request, Response } from 'express'
import { VerifyErrors } from 'jsonwebtoken'
import { JWTData } from '../types/JWTData'
import { JWTToken } from '../types/JWTToken'
import { isTokenValidInDb } from '../db/isTokenValidInDb'
import { assertJWTEnv } from '../utils/assertConfig'

export const authenticateJWT = (
    req: Request,
    res: Response,
    next: Function
) => {
    const jwtKey = assertJWTEnv()

    const authHeader = req.headers.authorization

    if (authHeader) {
        const token = <JWTToken>authHeader.split(' ')[1]

        jsonWebToken.verify(
            token,
            jwtKey,
            {
                algorithms: ['HS256'],
            },
            async (err: VerifyErrors | null, data: {} | undefined) => {
                if (err || !data) {
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
