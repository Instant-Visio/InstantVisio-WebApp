import {
    LocalNotificationActionPerformed,
    NotificationChannel,
    Plugins,
} from '@capacitor/core'
const { LocalNotifications } = Plugins
export class LocalNotificationsService {
    static async schedule(
        title?: string,
        body?: string,
        extra?: any,
        channelId = 'visio-call-notifications'
    ) {
        const ONE_SECOND_FROM_NOW = new Date(Date.now() + 1000)
        const notifs = await LocalNotifications.schedule({
            notifications: [
                {
                    title: title || 'Incoming InstantVisio call',
                    body: body || 'Click to join',
                    id: new Date().getTime(),
                    schedule: { at: ONE_SECOND_FROM_NOW },
                    attachments: undefined,
                    actionTypeId: '',
                    extra,
                    smallIcon: 'ic_logo_mobile',
                    channelId,
                },
            ],
        })
        console.log('scheduled notifications', notifs)
    }

    static listenForNotificationClick(
        redirectHandler: (roomUrl: string) => void
    ) {
        LocalNotifications.addListener(
            'localNotificationActionPerformed',
            (notification: LocalNotificationActionPerformed) => {
                console.log(
                    'Local action performed: ' + JSON.stringify(notification)
                )
                const { roomUrl } = notification.notification.extra
                redirectHandler(roomUrl)
            }
        )
    }

    static createChannel(channel: NotificationChannel) {
        LocalNotifications.createChannel(channel)
    }
}
