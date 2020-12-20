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
    static init() {
        PushNotificationsService.requestPermissions()
        const notificationChannel: NotificationChannel = {
            id: 'visio-call-notifications', // id must match android/app/src/main/res/values/strings.xml's default_notification_channel_id
            name: 'Visio call notifications',
            description: 'Visio call notifications',
            importance: 5,
            visibility: 1,
        }

        PushNotificationsService.createChannel(notificationChannel)
        LocalNotificationsService.createChannel(notificationChannel)
        PushNotificationsService.listenForRegistration()
        PushNotificationsService.listenForNotificationClick()
    }

    static requestPermissions() {
        PushNotifications.requestPermission().then((result) => {
            if (result.granted) {
                console.log('Permissions granted')
                // Register with Apple / Google to receive push via APNS/FCM
                PushNotifications.register()
            } else {
                console.log('Error registering for notifications')
            }
        })
    }

    static listenForRegistration() {
        this.listenForRegistrationSuccess()
        this.listenForRegistrationError()
    }

    static listenForRegistrationSuccess() {
        // On success, we should be able to receive notifications
        PushNotifications.addListener(
            'registration',
            (token: PushNotificationToken) => {
                console.log('Push registration success, token: ' + token.value)
                this.subscribeToTopic('test')
            }
        )
    }

    static async subscribeToTopic(topic: string) {
        try {
            await fcm.subscribeTo({ topic })
            this.listenForPayload()
            console.log('subscribed to topic')
        } catch (err) {
            console.log(err)
        }
    }

    static listenForRegistrationError() {
        // Some issue with our setup and push will not work
        PushNotifications.addListener('registrationError', (error: any) => {
            console.log('Error on registration: ' + JSON.stringify(error))
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

                LocalNotificationsService.schedule(title, body)
            }
        )
    }

    static listenForNotificationClick() {
        // Method called when tapping on a notification
        PushNotifications.addListener(
            'pushNotificationActionPerformed',
            (notification: PushNotificationActionPerformed) => {
                console.log(
                    'Push action performed: ' + JSON.stringify(notification)
                )
                this.redirectToCallPage()
            }
        )
    }

    static redirectToCallPage() {
        window.location.pathname = `/premium-video/room/test`
    }

    static createChannel(notificationChannel: NotificationChannel) {
        PushNotifications.createChannel(notificationChannel)
    }
}
