import * as functions from 'firebase-functions'
import { isEmpty } from 'lodash'
import fetch from 'node-fetch'
import { logRoomCreated } from '../sumologic/sumologic'
import { alert } from './alerts/alert'
import { ALERT_ROOM_NOT_CREATED } from './alerts/alertList'
import { sendNotification } from '../notifications/sendNotification'
import { NotificationFormatType, NotificationType } from '../types/Notification'

const roomExpirationSeconds = 60 * 120 // = 2hr

export const newCall = functions.https.onCall(async (data, context) => {
    const { visio, app } = functions.config()

    if (isEmpty(data) || isEmpty(data.name)) {
        throw new functions.https.HttpsError(
            'failed-precondition',
            'Input parameters are empty'
        )
    }

    if (isEmpty(data.lang)) {
        console.warn('Missing "lang" params')
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

    if (data.phone) {
        const lastChar = data.phone.substring(data.phone.length - 1)
        const countOfSameNbr = data.phone.split(lastChar).length - 1
        if (countOfSameNbr > 6) {
            console.warn(
                'blocked number',
                data.phone,
                context.rawRequest.ip,
                context.rawRequest.ips
            )

            throw new functions.https.HttpsError(
                'failed-precondition',
                'Blocked ip'
            )
        }
    }

    const room = await getFreeRoomUrl(
        {
            apikey: visio.apikey,
            api: visio.api,
        },
        app.domain
    )

    if (!isEmpty(data.name)) {
        const lang = data.lang ? data.lang.trim().toLowerCase() : 'en'
        if (data.phone) {
            await sendNotification({
                type: NotificationType.SmsNotificationType,
                formatType: NotificationFormatType.Now,
                name: data.name,
                phone: data.phone,
                country: data.country || 'FR',
                roomUrl: room.roomUrl,
                lang: lang,
            })
        } else {
            await sendNotification({
                type: NotificationType.EmailNotificationType,
                formatType: NotificationFormatType.Now,
                name: data.name,
                email: data.email,
                roomUrl: room.roomUrl,
                emailFrom: app.emailfrom,
                lang: lang,
            })
        }
    }

    return room
})

interface VisioCredentials {
    apikey: string
    api: string
}

interface Room {
    roomUrl: string
    name: string
    id: string
    privacy: string
    url: string
    created_at: string
    config: any
}

const getFreeRoomUrl = async (
    credentials: VisioCredentials,
    domainName: string
): Promise<Room> => {
    const response = await fetch(credentials.api, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${credentials.apikey}`,
        },
        body: JSON.stringify({
            properties: {
                enable_screenshare: false,
                lang: 'fr',
                exp: Math.floor(Date.now() / 1000) + roomExpirationSeconds,
            },
        }),
    })
    if (response.ok) {
        const result = await response.json()
        logRoomCreated()
        return {
            roomUrl: `https://${domainName}/visio/${result.name}`,
            ...result,
        }
    }
    await alert(ALERT_ROOM_NOT_CREATED)
    throw new functions.https.HttpsError('resource-exhausted', '400')
}
