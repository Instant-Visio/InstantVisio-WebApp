import { Request, Response } from 'express'
import { HttpError } from '../errors/HttpError'

// noinspection JSUnusedLocalSymbols
export const errorMiddleware = (
    error: Error,
    req: Request,
    res: Response,
    next: Function
) => {
    const url = req.protocol + '://' + req.get('host') + req.originalUrl
    if (error instanceof HttpError) {
        const httpError = <HttpError>error
        console.log(
            `API HTTP Error ${httpError.statusCode}:${httpError.message} at ${url}`
        )
        return res.status(httpError.statusCode).send({
            error: httpError.message,
        })
    }

    console.error(`API ERROR ${url}`, error)

    return res.status(500).send({
        error: 'Internal Server Error',
    })
}
