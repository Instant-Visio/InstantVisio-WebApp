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
        topic: 'test',
    }

    try {
        const response = await admin.messaging().send(message)
        console.log('Successfully sent message:', response)
        res.status(204)
    } catch (err) {
        console.log('Error sending message:', err)
        res.status(500)
    }
    res.send()
}
