import { InternalServerError } from './HttpError'

describe('HttpError', () => {
    it('InternalServerError', () => {
        const error = new InternalServerError()
        expect(error).toBeInstanceOf(InternalServerError)
        expect(error.statusCode).toEqual(500)
    })
})
