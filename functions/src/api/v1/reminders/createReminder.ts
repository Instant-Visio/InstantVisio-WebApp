import { Request, Response } from 'express'
import { wrap } from 'async-middleware'
import { assertRightToEditRoom } from '../../../db/assertRightsToEditRoom'
import { BadRequestError } from '../../errors/HttpError'
import { isDestinationsCorrectlyFormatted } from '../utils/isDestinationsCorrectlyFormatted'
import { ReminderDao } from '../../../db/ReminderDao'
import { Timestamp } from '../../../firebase/firebase'
import { assertTimestampInFuture } from './assertTimestampInFuture'

/**
 * @swagger
 * /v1/rooms/{roomId}/reminders/:
 *   post:
 *     description: Create a new reminder. A reminder is composed of a send timestamp as well as multiple destination(s) (sms and/or emails).
 *     tags:
 *       - rooms
 *     consumes:
 *     - multipart/form-data
 *     produces:
 *     - application/json
 *     parameters:
 *       - name: hostName
 *         description: The name or organisation which sent the invite(s)
 *         in: x-www-form-urlencoded
 *         required: true
 *         type: string
 *       - name: sendAt
 *         description: The UTC timestamp in seconds at which the reminder is scheduled to be sent.
 *         in: x-www-form-urlencoded
 *         required: true
 *         type: integer
 *       - name: destinations
 *         description: An array of destinations
 *         in: x-www-form-urlencoded
 *         required: true
 *         examples:
 *            mixed:
 *                summary: Mixed email, sms and languages
 *                $ref: '#/components/examples/Destinations'
 *         schema:
 *            type: string
 *         items:
 *            $ref: '#/components/schemas/Destination'
 *     responses:
 *       201:
 *         description: Reminder created with success
 *         content:
 *           application/json:
 *             example: {
 *               reminderId: "aZxo2xskIaZxo2xskI"
 *             }
 *       400:
 *         description: request content (x-www-form-urlencoded) not correct
 *       401:
 *         description: missing authorization bearer token
 *       403:
 *         description: authorization header present but not valid
 *       412:
 *         description: authorization header present but not formatted correctly
 */
export const createReminder = wrap(async (req: Request, res: Response) => {
    const userId = res.locals.uid
    const roomId = req.params.roomId
    await assertRightToEditRoom(roomId, userId)

    const body = req.body
    const sendAt = parseInt(body.sendAt) * 1000
    const hostName = req.body.hostName
    const destinations = JSON.parse(body.destinations || '[]')

    if (
        !sendAt ||
        !hostName ||
        !isDestinationsCorrectlyFormatted(destinations)
    ) {
        throw new BadRequestError('Request body not formatted correctly')
    }

    const sendAtTimestamp = Timestamp.fromMillis(sendAt)
    assertTimestampInFuture(sendAtTimestamp)

    const reminderId = await ReminderDao.add(
        roomId,
        sendAtTimestamp,
        destinations,
        hostName
    )

    res.send({
        reminderId,
    })
})
