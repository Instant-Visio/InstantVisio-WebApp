import * as functions from 'firebase-functions'
import { JWTKey } from '../types/JWT'
import { InternalServerError } from '../api/errors/HttpError'
import { TwilioEnv } from '../types/TwilioEnv'
import { AppEnv } from '../types/AppEnv'
import { OVHCredentials } from '../types/OVHCredentials'
import { SendGridEnv } from '../types/SendGridEnv'

export const getJWTEnv = (): JWTKey => {
    const { jwt } = functions.config()
    if (!jwt.key) {
        throw new InternalServerError('Missing JWT Key')
    }
    return jwt.key
}

export const getTwilioEnv = (): TwilioEnv => {
    const { twilio } = functions.config()
    if (
        !twilio.sid ||
        !twilio.authtoken ||
        !twilio.apikeysid ||
        !twilio.apikeysecret
    ) {
        throw new InternalServerError(
            'Missing Twilio sid or authtoken or apikeysid or apikeysecret'
        )
    }
    return {
        sid: twilio.sid,
        authToken: twilio.authtoken,
        apiKeySid: twilio.apikeysid,
        apiKeySecret: twilio.apikeysecret,
    }
}

export const getAppEnv = (): AppEnv => {
    const { app } = functions.config()
    if (!app.domain || !app.emailfrom) {
        throw new InternalServerError('Missing app domain or emailfrom env')
    }
    return {
        domain: app.domain,
        emailFrom: app.emailfrom,
    }
}

export const getOVHEnv = (): OVHCredentials => {
    const { ovh } = functions.config()
    if (!ovh.consumerkey || !ovh.servicename || !ovh.appsecret || !ovh.appkey) {
        throw new InternalServerError(
            'Missing ovh consumerkey or servicename or appsecret or appkey env'
        )
    }
    return {
        consumerkey: ovh.consumerkey,
        servicename: ovh.servicename,
        appsecret: ovh.appsecret,
        appkey: ovh.appkey,
    }
}

export const getSendGridEnv = (): SendGridEnv => {
    const { sendgrid } = functions.config()
    if (!sendgrid.apikey || !sendgrid.ip_pool_name) {
        throw new InternalServerError(
            'Missing sendgrid apikey or ip_pool_name env'
        )
    }
    return {
        apikey: sendgrid.apikey,
        ip_pool_name: sendgrid.ip_pool_name,
    }
}
