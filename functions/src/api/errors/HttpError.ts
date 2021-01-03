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

export class MessagingServerError extends HttpError {
    constructor(message?: string) {
        super(500, message || 'Messaging Internal Server Error')
    }
}

export class BadRequestError extends HttpError {
    constructor(message?: string) {
        super(400, message || 'Bad Request')
    }
}

export class NoAvailableTokenError extends BadRequestError {
    constructor() {
        super('No token available')
    }
}

export class UnauthorizedError extends HttpError {
    constructor(message?: string) {
        super(401, message || 'Unauthorized')
    }
}

export class PaymentRequiredError extends HttpError {
    constructor(message?: string) {
        super(402, message || 'Payment Required')
    }
}

export class ForbiddenError extends HttpError {
    constructor(message?: string) {
        super(403, message || 'Forbidden')
    }
}

export class GroupEditForbiddenError extends ForbiddenError {
    constructor() {
        super('Group edit forbidden')
    }
}

export class GroupReadForbiddenError extends ForbiddenError {
    constructor() {
        super('Group read forbidden')
    }
}

export class NotFoundError extends HttpError {
    constructor(message?: string) {
        super(404, message || 'Not Found')
    }
}

export class UserNotFoundError extends NotFoundError {
    constructor() {
        super('User Not Found')
    }
}

export class RoomNotFoundError extends NotFoundError {
    constructor(message?: string) {
        super(message || 'Room Not Found')
    }
}

export class GroupNotFoundError extends NotFoundError {
    constructor() {
        super('Group Not Found')
    }
}

export class ReminderNotFoundError extends NotFoundError {
    constructor(message?: string) {
        super(message || 'Reminder Not Found')
    }
}

class ConflictError extends HttpError {
    constructor(message?: string) {
        super(409, message || 'Conflict')
    }
}

export class GroupConflictError extends ConflictError {
    constructor() {
        super('Group already exist')
    }
}

class GoneError extends HttpError {
    constructor(message?: string) {
        super(410, message || 'Gone')
    }
}

export class RoomEndedError extends GoneError {
    constructor() {
        super('Room ended')
    }
}

export class PreconditionFailedError extends HttpError {
    constructor(message?: string) {
        super(412, message || 'PreconditionFailed')
    }
}
