import { JSONParse } from '../utils/JSONParse'

export const parseSendsAt = (sendsAt: string | Array<string>): string[] => {
    return Array.isArray(sendsAt) ? sendsAt : JSONParse(sendsAt)
}
