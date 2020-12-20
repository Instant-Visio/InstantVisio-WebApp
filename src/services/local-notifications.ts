import { NotificationChannel, Plugins } from '@capacitor/core'
const { LocalNotifications } = Plugins
export class LocalNotificationsService {
    static async schedule(title?: string, body?: string) {
        const ONE_SECOND_FROM_NOW = new Date(Date.now() + 1000)
        const notifs = await LocalNotifications.schedule({
            notifications: [
                {
                    title: title || 'Incoming InstantVisio call',
                    body: body || 'Click to join',
                    id: new Date().getTime(),
                    schedule: { at: ONE_SECOND_FROM_NOW },
                    sound: undefined,
                    attachments: undefined,
                    actionTypeId: '',
                    extra: null,
                    channelId: 'visio-call-notifications',
                },
            ],
        })
        console.log('scheduled notifications', notifs)
    }

    static createChannel(channel: NotificationChannel) {
        LocalNotifications.createChannel(channel)
    }
}
