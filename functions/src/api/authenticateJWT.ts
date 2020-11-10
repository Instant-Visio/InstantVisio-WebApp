import * as jsonWebToken from 'jsonwebtoken'
import { Request, Response } from 'express'
import { VerifyErrors } from 'jsonwebtoken'
import { isTokenValidInDb } from '../db/isTokenValidInDb'
import { getJWTEnv } from '../utils/assertConfig'
import { JWTData, JWTToken } from '../types/JWT'

export const authenticateJWT = (
    req: Request,
    res: Response,
    next: Function
) => {
    const jwtKey = getJWTEnv()

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
