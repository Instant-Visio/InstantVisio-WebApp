import * as express from 'express'
import * as cors from 'cors'
import { getRooms } from './rooms/getRooms'
import { authenticateJWTMiddleware } from '../middlewares/authenticateJWTMiddleware'

const router = express.Router()

router.use(cors({ origin: true }))
router.use(authenticateJWTMiddleware)

router.get('/rooms/', getRooms)

export default router
