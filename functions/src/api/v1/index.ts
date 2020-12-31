import * as express from 'express'
import * as bodyParser from 'body-parser'
import { getRooms } from './rooms/getRooms'
import { authenticateJWTMiddleware } from '../middlewares/authenticateJWTMiddleware'
import { createRoomRoute } from './rooms/createRoom'
import { editRoom } from './rooms/editRoom'
import { joinRoom } from './rooms/joinRoom'
import { inviteParticipantsRoute } from './invite/inviteParticipants'
import { createReminderRoute } from './reminders/createReminder'
import { editReminder } from './reminders/editReminder'
import { deleteReminder } from './reminders/deleteReminder'
import { getReminders } from './reminders/getReminders'
import { getUser } from './users/getUser'
import { createGroup } from './group/createGroup'
import { editGroup } from './group/editGroup'
import { getGroup } from './group/getGroup'
import { addMembersToGroup } from './group/addMembersToGroup'
import { removeMembersFromGroup } from './group/removeMembersFromGroup'
import { joinGroup } from './group/joinGroup'
import { addRegistrationToken } from './users/addRegistrationToken'
import { editUser } from './users/editUser'
import { getGroups } from './group/getGroups'
import { deleteReminders } from './reminders/deleteReminders'
import { deleteRoom } from './rooms/deleteRoom'

const router = express.Router()
router.use(authenticateJWTMiddleware)
router.use(bodyParser.urlencoded({ extended: false }))

router.get('/rooms/', getRooms)
router.post('/rooms/new', createRoomRoute)
router.patch('/rooms/:roomId', editRoom)
router.post('/rooms/:roomId/join', joinRoom)
router.delete('/rooms/:roomId/', deleteRoom)
router.post('/rooms/:roomId/inviteParticipants', inviteParticipantsRoute)
router.get('/rooms/:roomId/reminders/', getReminders)
router.post('/rooms/:roomId/reminders/', createReminderRoute)
router.patch('/rooms/:roomId/reminders/:reminderId', editReminder)
router.delete('/rooms/:roomId/reminders/:reminderId', deleteReminder)
router.delete('/rooms/:roomId/reminders/', deleteReminders)

// User
router.get('/users/:userId/', getUser)
router.patch('/users/:userId/', editUser)
router.post('/users/:userId/addRegistrationToken', addRegistrationToken)

// Group
router.get('/groups/', getGroups)
router.post('/groups/', createGroup)
router.patch('/groups/:groupId', editGroup)
router.get('/groups/:groupId', getGroup)
router.post('/groups/:groupId/addMembers', addMembersToGroup)
router.delete('/groups/:groupId/removeMembers', removeMembersFromGroup)
router.post('/groups/:groupId/join', joinGroup)

export default router
