import { PushNotificationParams } from '../types/Notification'
import { messaging } from '../firebase/firebase'

export const sendPush = async (
    params: PushNotificationParams,
    messageBody: string,
    subject: string
) => {
    try {
        await messaging().send({
            data: params.additionalData,
            notification: {
                title: subject,
                body: messageBody,
            },
            topic: params.topic,
        })
    } catch (error) {
        console.log('Failed to send push notification to topic')
    }
}
