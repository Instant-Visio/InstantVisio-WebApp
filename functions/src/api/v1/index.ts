import * as express from 'express'
import * as cors from 'cors'
import { getRooms } from './rooms/getRooms'
import { authenticateJWT } from '../authenticateJWT'

const router = express.Router()

router.use(cors({ origin: true }))
router.use(authenticateJWT)

router.get('/rooms/', getRooms)

export default router
