import { Request, Response } from 'express'
import * as admin from 'firebase-admin'

export const sendTestPushNotification = async (req: Request, res: Response) => {
    const message = {
        data: {
            roomId: 'test',
        },
        notification: {
            title: 'Aegnor invited you to join a call',
            body: 'Click to join',
        },
        android: {
            priority: 'high',
        },
        topic: 'test',
    }

    try {
        const response = await admin.messaging().send(message as any)
        console.log('Successfully sent message:', response)
        res.status(204)
    } catch (err) {
        console.log('Error sending message:', err)
        res.status(500)
    }
    res.send()
}
