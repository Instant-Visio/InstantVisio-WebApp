import { BadRequestError } from '../../errors/HttpError'

export const JSONParse = (data: string) => {
    try {
        return JSON.parse(data)
    } catch (error) {
        throw new BadRequestError('Malformed request, unable to parse')
    }
}
