import { PushNotificationParams } from '../types/Notification'
import { messaging } from '../firebase/firebase'
import * as functions from 'firebase-functions'

export const sendPush = async (
    params: PushNotificationParams,
    messageBody: string,
    subject: string
) => {
    try {
        const { responses, successCount } = await messaging().sendMulticast({
            data: {
                ...params.additionalData,
                channelId: params.channelId,
            },
            notification: {
                title: subject,
                body: messageBody,
            },
            android: {
                priority: 'high',
                notification: {
                    channelId: params.channelId,
                },
            },
            tokens: params.tokens.filter((token) => token?.length),
        })
        if (successCount === 0) {
            console.log(
                'token',
                params.tokens.filter((token) => token?.length)
            )
            for (const resp of responses) {
                console.log(resp.error)
            }

            throw new functions.https.HttpsError(
                'unknown',
                'Zero notification push sent'
            )
        }
    } catch (error) {
        console.error('Failed to send push notification', error)
        throw new functions.https.HttpsError('unknown', error.message)
    }
}
