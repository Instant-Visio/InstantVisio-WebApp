import * as functions from 'firebase-functions'
import { JWTKey } from '../types/JWT'
import { InternalServerError } from '../api/errors/HttpError'
import { TwilioEnv } from '../types/TwilioEnv'
import { AppEnv } from '../types/AppEnv'
import { OVHCredentials } from '../types/OVHCredentials'
import { SendGridEnv } from '../types/SendGridEnv'

export const getJWTEnv = (): JWTKey => {
    const {
        jwt: { key },
    } = functions.config()
    if (!key) {
        throw new InternalServerError('Missing JWT Key')
    }
    return key
}

export const getTwilioEnv = (): TwilioEnv => {
    const {
        twilio: { sid, authtoken, apikeysid, apikeysecret },
    } = functions.config()
    if (!sid || !authtoken || !apikeysid || !apikeysecret) {
        throw new InternalServerError(
            'Missing Twilio sid or authtoken or apikeysid or apikeysecret'
        )
    }
    return {
        sid: sid,
        authToken: authtoken,
        apiKeySid: apikeysid,
        apiKeySecret: apikeysecret,
    }
}

export const getAppEnv = (): AppEnv => {
    const {
        app: { domain, emailfrom },
    } = functions.config()
    if (!domain || !emailfrom) {
        throw new InternalServerError('Missing app domain or emailfrom env')
    }
    return {
        domain: domain,
        emailFrom: emailfrom,
    }
}

export const getOVHEnv = (): OVHCredentials => {
    const {
        ovh: { consumerkey, servicename, appsecret, appkey },
    } = functions.config()
    if (!consumerkey || !servicename || !appsecret || !appkey) {
        throw new InternalServerError(
            'Missing ovh consumerkey or servicename or appsecret or appkey env'
        )
    }
    return {
        consumerKey: consumerkey,
        serviceName: servicename,
        appSecret: appsecret,
        appKey: appkey,
    }
}

export const getSendGridEnv = (): SendGridEnv => {
    const {
        sendgrid: { apikey, ip_pool_name },
    } = functions.config()
    if (!apikey || !ip_pool_name) {
        throw new InternalServerError(
            'Missing sendgrid apikey or ip_pool_name env'
        )
    }
    return {
        apiKey: apikey,
        ipPoolName: ip_pool_name,
    }
}
