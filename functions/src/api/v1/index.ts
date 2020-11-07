import * as express from 'express'
import * as cors from 'cors'
import { getRooms } from './rooms/getRooms'

const router = express.Router()

router.use(cors({ origin: true }))

router.get('/rooms/', getRooms)

export default router
