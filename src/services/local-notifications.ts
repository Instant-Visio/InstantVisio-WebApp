import { Plugins } from '@capacitor/core'
const { LocalNotifications } = Plugins

export class LocalNotificationsService {
    static async schedule(hostName?: string) {
        const ONE_SECOND_FROM_NOW = new Date(Date.now() + 1000)
        const notifs = await LocalNotifications.schedule({
            notifications: [
                {
                    title: `${hostName || 'Aegnor'} invited you to join a call`,
                    body: 'Click to join!',
                    id: new Date().getTime(),
                    schedule: { at: ONE_SECOND_FROM_NOW },
                    sound: undefined,
                    attachments: undefined,
                    actionTypeId: '',
                    extra: null,
                },
            ],
        })
        console.log('scheduled notifications', notifs)
    }
}
