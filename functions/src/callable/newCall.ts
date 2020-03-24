import * as functions from 'firebase-functions'
import {isEmpty} from 'lodash'
import fetch from 'node-fetch'
import * as sgMail from '@sendgrid/mail'
import * as ovh from 'ovh'

export const newCall = functions.https.onCall(async data => {
    const {ovh, sendgrid, visio} = functions.config()

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

    if (isEmpty(sendgrid)) {
        console.warn("Warn: No credentials for SendGrid")
    }
    if (isEmpty(ovh)) {
        console.warn("Warn: No credentials for OVH")
    }

    const roomUrl = await getRoomUrl({
        apikey: visio.apikey,
        api: visio.api,
    })

    if (!isEmpty(data.name)) {
        await triggerNotification({
            name: data.name,
            email: data.email,
            phone: data.phone,
            roomUrl: roomUrl,
            ovhCredentials: ovh,
            sendGridCredentials: sendgrid
        })
    }

    return {
        roomUrl: roomUrl
    }
})

interface VisioCredentials {
    apikey: string,
    api: string
}

interface NotificationParams {
    name: string,
    email: string,
    phone: string,
    roomUrl: string,
    ovhCredentials: {
        consumerkey: string,
        appsecret: string,
        appkey: string,
        servicename: string
    },
    sendGridCredentials: {
        apikey: string
    }
}

const getRoomUrl = async (credentials: VisioCredentials) => {
    const response = await fetch(credentials.api, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${credentials.apikey}`
        }
    })
    const result = await response.json()
    return result.url
}

const triggerNotification = async (params: NotificationParams) => {
    const message = `Bonjour, c'est ${params.name}, je voudrais que tu me rejoignes en visio en cliquant sur ce lien ${params.roomUrl}`
    if (!isEmpty(params.email) && !isEmpty(params.sendGridCredentials)) {
        await sendEmail(params, message)
    }
    if (!isEmpty(params.phone) && !isEmpty(params.ovhCredentials)) {
        await sendSms(params, message)
    }
}

const sendEmail = async (params: NotificationParams, messageBody: string) => {
    sgMail.setApiKey(params.sendGridCredentials.apikey)
    const msg = {
        to: params.email,
        from: 'noreply@instantvisio.com',
        subject: 'Demande URGENTE de visiophonie de votre proche',
        text: messageBody,
    }

    try {
        const result = await sgMail.send(msg)
        const response = result && result[0]
        if (response.statusCode > 200 && response.statusCode < 400) {
            return Promise.resolve()
        }
        console.log(`Fail to send email for room ${params.roomUrl}`, response.statusCode, response.statusMessage, response.body)
    } catch (err) {
        console.error(err.toString())
    }
    return Promise.reject("Failed to send email")
}

const sendSms = async (params: NotificationParams, messageBody: string) => {
    const ovhInstance = ovh({
        appKey: params.ovhCredentials.appkey,
        appSecret: params.ovhCredentials.appsecret,
        consumerKey: params.ovhCredentials.consumerkey
    })

    return new Promise((resolve, reject) => {
        // Send a simple SMS with a short number using your serviceName
        ovhInstance.request('POST', `/sms/${params.ovhCredentials.servicename}/jobs`, {
            message: 'Hello World!',
            senderForResponse: true,
            receivers: [params.phone],
            sender: 'InstanVisio'
        }, (errsend: any, result: any) => {
            console.log(errsend, result)
            if (!errsend) {
                resolve(result)
            } else {
                reject(errsend)
            }
        })
    })

}
