import * as functions from 'firebase-functions'
import { ReminderDao } from '../db/ReminderDao'
import { Request, Response } from 'express'
import { NotificationContent } from '../types/Notification'
import { sendNotifications } from '../notifications/sendNotifications'
import { formatRoomUrl, RoomDao } from '../db/RoomDao'

export const remindersCron = functions
    .runWith({
        timeoutSeconds: 540,
        memory: '2GB',
    })
    .pubsub // Every 5 minutes, every day
    .schedule('*/5 * * * *')
    .onRun(async () => {
        return processScheduledReminders()
    })

export const processScheduledReminder = async (req: Request, res: Response) => {
    await processScheduledReminders()

    res.send()
}

const FiveMinutesMs = 5 * 60 * 1000
export const processScheduledReminders = async () => {
    const reminders = await ReminderDao.listBetween(
        new Date(),
        new Date(Date.now() + FiveMinutesMs)
    )

    let emailsSentTotal = 0
    let smsSentTotal = 0
    let pushsSentTotal = 0

    for (const reminder of reminders) {
        const room = await RoomDao.get(reminder.roomId)
        const notificationContent: NotificationContent = {
            name: reminder.hostName,
            roomUrl: formatRoomUrl(reminder.roomId, room.password),
        }

        const { emailsSent, smssSent, pushsSent } = await sendNotifications(
            reminder.destinations,
            notificationContent,
            reminder.roomId
        )

        await ReminderDao.update({
            reminderId: reminder.id,
            isSent: true,
        })
        emailsSentTotal += emailsSent.length
        smsSentTotal += smssSent.length
        pushsSentTotal += pushsSent.length
    }

    if (emailsSentTotal > 0 || smsSentTotal > 0 || pushsSentTotal > 0) {
        console.info(
            `Reminder cron sent: email:${emailsSentTotal}, sms:${smsSentTotal}, push:${pushsSentTotal}`
        )
    }

    return
}
