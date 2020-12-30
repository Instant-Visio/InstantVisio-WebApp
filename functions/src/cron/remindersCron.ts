import * as functions from 'firebase-functions'
import { ReminderDao } from '../db/ReminderDao'
import { Request, Response } from 'express'

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

    console.log('Upcoming reminder', reminders)

    return
}
