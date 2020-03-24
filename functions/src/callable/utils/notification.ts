import * as sgMail from '@sendgrid/mail'
import * as ovh from 'ovh'

export interface NotificationParams {
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


export const sendEmail = async (params: NotificationParams, messageBody: string) => {
    sgMail.setApiKey(params.sendGridCredentials.apikey)
    const msg = {
        to: params.email,
        from: 'noreply@instantvisio.com',
        subject: `Demande URGENTE de visiophonie de ${params.name}`,
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

export const sendSms = async (params: NotificationParams, messageBody: string) => {
    const ovhInstance = ovh({
        appKey: params.ovhCredentials.appkey,
        appSecret: params.ovhCredentials.appsecret,
        consumerKey: params.ovhCredentials.consumerkey
    })

    return new Promise((resolve, reject) => {
        ovhInstance.request('POST', `/sms/${params.ovhCredentials.servicename}/jobs`, {
            message: messageBody,
            noStopClause: true,
            receivers: [params.phone],
            sender: 'InstanVisio',
            priority: "high",
            validityPeriod: 30, // 30 min
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
