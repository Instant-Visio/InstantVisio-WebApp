import {
    Plugins,
    PushNotification,
    PushNotificationToken,
    PushNotificationActionPerformed,
} from '@capacitor/core'

const { PushNotifications } = Plugins

export class PushNotificationsService {
    static requestPermissions() {
        PushNotifications.requestPermission().then((result) => {
            if (result.granted) {
                // Register with Apple / Google to receive push via APNS/FCM
                PushNotifications.register()
            } else {
                // Show some error
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
            }
        )
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
            }
        )
    }
}
