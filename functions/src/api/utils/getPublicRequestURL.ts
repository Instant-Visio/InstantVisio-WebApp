import { Request } from 'express'
import { getAppEnv } from '../../firebase/env'
export const getPublicRequestURL = (request: Request) => {
    const { domain } = getAppEnv() // GCP wrap the host to the end host & protocol is not the public one
    return `https://${domain}${request.originalUrl}`
}
