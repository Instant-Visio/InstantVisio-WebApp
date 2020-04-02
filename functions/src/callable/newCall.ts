import * as functions from 'firebase-functions'
import {isEmpty} from 'lodash'
import fetch from 'node-fetch'
import {NotificationParams, sendEmail, sendSms} from './utils/notification'
import {logRoomCreated} from '../sumologic/sumologic'

const roomExpirationSeconds = 60 * 120 // = 2hr

export const newCall = functions.https.onCall(async data => {
    const {ovh, sendgrid, visio, app} = functions.config()

    if (isEmpty(data) || isEmpty(data.name)) {
        throw new functions.https.HttpsError(
            'failed-precondition',
            'Input parameters are empty'
        )
    }

    if (isEmpty(visio) || isEmpty(visio.apikey) || isEmpty(visio.api)) {
        throw new functions.https.HttpsError(
            'failed-precondition',
            'Config missing for Visio (api/apikey)'
        )
    }

    if (isEmpty(app) || isEmpty(app.domain) || isEmpty(app.emailfrom)) {
        throw new functions.https.HttpsError(
            'failed-precondition',
            'Config missing for app (domain/emailfrom)'
        )
    }

    if (isEmpty(data.platform) || data.platform !== "web") {
        throw new functions.https.HttpsError(
            'failed-precondition',
            'Missing platform on request, or only web platform is allowed for the moment'
        )
    }

    if (isEmpty(sendgrid)) {
        console.warn("Warn: No credentials for SendGrid")
    }
    if (isEmpty(ovh)) {
        console.warn("Warn: No credentials for OVH")
    }

    const room = await getRoomUrl({
        apikey: visio.apikey,
        api: visio.api,
    }, app.domain)

    if (!isEmpty(data.name)) {
        await triggerNotification({
            name: data.name,
            email: data.email,
            phone: data.phone,
            country: data.country || 'FR',
            roomUrl: room.roomUrl,
            ovhCredentials: ovh,
            sendGridCredentials: sendgrid,
            emailFrom: app.emailfrom
        })
    }

    return room
})

interface VisioCredentials {
    apikey: string,
    api: string
}

interface Room {
    roomUrl: string,
    name: string,
    id: string,
    privacy: string,
    url: string,
    created_at: string,
    config: any
}

const getRoomUrl = async (credentials: VisioCredentials, domainName: string): Promise<Room> => {
    const response = await fetch(credentials.api, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${credentials.apikey}`
        },
        body: JSON.stringify({
            properties: {
                enable_screenshare: false,
                lang: 'fr',
                exp: Math.floor(Date.now() / 1000) + roomExpirationSeconds
            }
        })
    })
    const result = await response.json()
    logRoomCreated()
    return {
        roomUrl: `https://${domainName}/visio/${result.name}`,
        ...result
    }
}

export const triggerNotification = async (params: NotificationParams) => {
    const name  = params.name.replace(/(.{20})..+/, "$1…");

    const message = `${name} vous invite à une conversation vidéo. Rejoignez maintenant la conversation sur ce lien : ${params.roomUrl}`
    if (!isEmpty(params.email) && !isEmpty(params.sendGridCredentials)) {
        await sendEmail(params, message)
    }
    if (!isEmpty(params.phone) && !isEmpty(params.ovhCredentials)) {
        await sendSms(params, message)
    }
}
