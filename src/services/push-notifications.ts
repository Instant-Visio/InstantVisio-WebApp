import {
    Plugins,
    PushNotification,
    PushNotificationToken,
    PushNotificationActionPerformed,
    NotificationChannel,
} from '@capacitor/core'
import { FCM } from '@capacitor-community/fcm'
import { LocalNotificationsService } from './local-notifications'
const fcm = new FCM()
const { PushNotifications } = Plugins

export class PushNotificationsService {
    static createDefaultChannel() {
        const notificationChannel: NotificationChannel = {
            id: 'visio-call-notifications',
            name: 'Visio call now',
            description: 'Visio call is starting now, this is important!',
            importance: 5,
            visibility: 1,
            vibration: true,
            lights: true,
            sound: 'xephron__perfect_message_ringtone_modified.mp3',
        }
        const notificationChannelReminders: NotificationChannel = {
            id: 'visio-call-reminders',
            name: 'Visio call reminders',
            description:
                'When you have a reminder that a video call is schedule for a date',
            importance: 3,
            visibility: 1,
            vibration: true,
            lights: true,
        }

        PushNotificationsService.createChannel(notificationChannel)
        LocalNotificationsService.createChannel(notificationChannel)
        PushNotificationsService.createChannel(notificationChannelReminders)
        LocalNotificationsService.createChannel(notificationChannelReminders)
    }

    static async requestPermissions() {
        const { granted } = await PushNotifications.requestPermission()
        if (granted) return true
        else return false
    }

    static register() {
        // Register with Apple / Google to receive push via APNS/FCM
        PushNotifications.register()
    }

    static listenForRegistration(
        successHandler: (registrationToken: string) => void,
        errorHandler: () => void
    ) {
        this.listenForRegistrationSuccess(successHandler)
        this.listenForRegistrationError(errorHandler)
    }

    static listenForRegistrationSuccess(
        successHandler: (registrationToken) => void
    ) {
        PushNotifications.addListener(
            'registration',
            (token: PushNotificationToken) => {
                successHandler(token.value)
                this.listenForPayload()
            }
        )
    }

    //TODO check if to remove, now unused
    static async subscribeToTopic(topic: string) {
        try {
            await fcm.subscribeTo({ topic })
            this.listenForPayload()
        } catch (err) {
            console.log(err)
        }
    }

    static listenForRegistrationError(errorHandler: () => void) {
        // Some issue with our setup and push will not work
        PushNotifications.addListener('registrationError', (error: any) => {
            console.log('Error on registration: ' + JSON.stringify(error))
            errorHandler()
        })
    }

    static listenForPayload() {
        // Show us the notification payload if the app is open on our device
        PushNotifications.addListener(
            'pushNotificationReceived',
            (notification: PushNotification) => {
                console.log('Push received: ' + JSON.stringify(notification))
                console.log('Payload: ', notification.data)
                const { title, body } = notification

                LocalNotificationsService.schedule(
                    title,
                    body,
                    notification.data,
                    notification.data.channelId
                )
            }
        )
    }

    static listenForNotificationClick(
        redirectHandler: (roomUrl: string) => void
    ) {
        PushNotifications.addListener(
            'pushNotificationActionPerformed',
            (notification: PushNotificationActionPerformed) => {
                console.log(
                    'Push action performed: ' + JSON.stringify(notification)
                )
                const { roomUrl } = notification.notification.data
                redirectHandler(roomUrl)
            }
        )
    }

    static createChannel(notificationChannel: NotificationChannel) {
        PushNotifications.createChannel(notificationChannel)
    }
}
