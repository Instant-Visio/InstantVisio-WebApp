import { Request, Response } from 'express'
import { HttpError } from '../errors/HttpError'

export const errorMiddleware = (error: Error, req: Request, res: Response) => {
    switch (error.constructor) {
        case HttpError: {
            const httpError = <HttpError>error
            return res.status(httpError.statusCode).send({
                error: httpError.message,
            })
        }
        default:
            return res.status(500).send({
                error: 'Internal Server Error',
            })
    }
}
