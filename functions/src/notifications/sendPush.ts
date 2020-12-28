import { PushNotificationParams } from '../types/Notification'
import { messaging } from '../firebase/firebase'

export const sendPush = async (
    params: PushNotificationParams,
    messageBody: string,
    subject: string
) => {
    try {
        await messaging().sendMulticast({
            data: params.additionalData,
            notification: {
                title: subject,
                body: messageBody,
            },
            tokens: params.tokens,
        })
    } catch (error) {
        console.log('Failed to send push notification to topic')
    }
}
