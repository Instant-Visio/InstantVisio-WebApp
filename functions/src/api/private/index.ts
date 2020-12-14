import * as express from 'express'
import * as bodyParser from 'body-parser'
import { twilioStatusCallbackWebHook } from './twilioStatusCallbackWebHook'

const router = express.Router()
router.use(bodyParser.urlencoded({ extended: false }))

router.post('/webhook/twilioStatusCallback', twilioStatusCallbackWebHook)

export default router
