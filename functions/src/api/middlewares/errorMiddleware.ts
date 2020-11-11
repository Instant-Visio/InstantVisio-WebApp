import { Request, Response } from 'express'
import { HttpError } from '../errors/HttpError'

// noinspection JSUnusedLocalSymbols
export const errorMiddleware = (
    error: Error,
    req: Request,
    res: Response,
    next: Function
) => {
    if (error instanceof HttpError) {
        const httpError = <HttpError>error
        return res.status(httpError.statusCode).send({
            error: httpError.message,
        })
    }

    return res.status(500).send({
        error: 'Internal Server Error',
    })
}
