import * as express from 'express'
import * as cors from 'cors'
import * as bodyParser from 'body-parser'
import { getRooms } from './rooms/getRooms'
import { authenticateJWTMiddleware } from '../middlewares/authenticateJWTMiddleware'
import { createRoom } from './rooms/createRoom'
import { editRoom } from './rooms/editRoom'

const router = express.Router()

router.use(cors({ origin: true }))
router.use(authenticateJWTMiddleware)
router.use(bodyParser.urlencoded({ extended: false }))

router.get('/rooms/', getRooms)
router.post('/rooms/new', createRoom)
router.patch('/rooms/:roomId', editRoom)

export default router
