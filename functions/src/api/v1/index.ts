import * as express from 'express'
import * as bodyParser from 'body-parser'
import { getRooms } from './rooms/getRooms'
import { authenticateJWTMiddleware } from '../middlewares/authenticateJWTMiddleware'
import { createRoomRoute } from './rooms/createRoom'
import { editRoom } from './rooms/editRoom'
import { joinRoom } from './rooms/joinRoom'
import { inviteParticipantsRoute } from './invite/inviteParticipantsRoute'
import { createReminderRoute } from './reminders/createReminderRoute'
import { editReminder } from './reminders/editReminder'
import { deleteReminder } from './reminders/deleteReminder'
import { getReminders } from './reminders/getReminders'
import { getUser } from './users/getUser'

const router = express.Router()
router.use(authenticateJWTMiddleware)
router.use(bodyParser.urlencoded({ extended: false }))

router.get('/rooms/', getRooms)
router.post('/rooms/new', createRoomRoute)
router.patch('/rooms/:roomId', editRoom)
router.post('/rooms/:roomId/join', joinRoom)
router.post('/rooms/:roomId/inviteParticipants', inviteParticipantsRoute)
router.get('/rooms/:roomId/reminders/', getReminders)
router.post('/rooms/:roomId/reminders/', createReminderRoute)
router.patch('/rooms/:roomId/reminders/:reminderId', editReminder)
router.delete('/rooms/:roomId/reminders/:reminderId', deleteReminder)
router.get('/users/:userId/', getUser)

export default router
