import { CustomError } from 'ts-custom-error'

export class HttpError extends CustomError {
    public constructor(public statusCode: number, message: string) {
        super(message)
    }
}

export class InternalServerError extends HttpError {
    constructor(message?: string) {
        super(500, message || 'Internal Server Error')
    }
}

export class BadRequestError extends HttpError {
    constructor(message?: string) {
        super(400, message || 'Bad Request')
    }
}

export class UnauthorizedError extends HttpError {
    constructor(message?: string) {
        super(401, message || 'Unauthorized')
    }
}

export class ForbiddenError extends HttpError {
    constructor(message?: string) {
        super(403, message || 'Forbidden')
    }
}

export class NotFoundError extends HttpError {
    constructor(message?: string) {
        super(404, message || 'Not Found')
    }
}

export class PreconditionFailedError extends HttpError {
    constructor(message?: string) {
        super(412, message || 'PreconditionFailed')
    }
}
