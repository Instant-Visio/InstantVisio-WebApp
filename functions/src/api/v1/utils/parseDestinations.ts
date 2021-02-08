import { JSONParse } from './JSONParse'
import { isDestinationsCorrectlyFormatted } from './isDestinationsCorrectlyFormatted'
import { BadRequestError } from '../../errors/HttpError'
import { InvitationDestination } from '../../../types/InvitationDestination'

export const parseDestinations = (
    destinations: string
): InvitationDestination[] => {
    const parsedDestinations = JSONParse(destinations || '[]')

    if (!isDestinationsCorrectlyFormatted(parsedDestinations)) {
        throw new BadRequestError('Request body not formatted correctly')
    }
    return parsedDestinations.map((destination: InvitationDestination) => ({
        ...destination,
        lang: destination.lang || 'fr',
    }))
}
