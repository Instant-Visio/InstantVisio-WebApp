import { Request, Response } from 'express'
import { wrap } from 'async-middleware'
import { getRoom } from '../../../db/getRoom'
import { ForbiddenError } from '../../errors/HttpError'
import {
    createTwilioClientToken,
    TTL_ACCESS_TOKEN_PARTICIPANT_SECONDS,
} from './service/createTwilioClientToken'

export interface JoinRoomResponse {
    jwtAccessToken: string
    ttl: number
}

/**
 * @swagger
 * /v1/rooms/{roomId}/join:
 *   post:
 *     description: Request to join an existing room. This will retrieve the client JWT access token (if granted) to join the room using the Twilio Video JS SDK.
 *     tags:
 *       - rooms
 *     consumes:
 *     - multipart/form-data
 *     produces:
 *     - application/json
 *     parameters:
 *       - name: password
 *         description: The room password
 *         in: x-www-form-urlencoded
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Room access granted
 *         content:
 *           application/json:
 *             schema:
 *               example: {
 *                   jwtAccessToken: "aZxo2xsk.IaZxo.2xskI",
 *                   ttl: 1440
 *               }
 *       401:
 *         description: missing authorization bearer token
 *       403:
 *         description: wrong password to join the room, or token not valid
 *       404:
 *         description: room does not exist
 *       412:
 *         description: authorization header present but not formatted correctly
 */
export const joinRoom = wrap(async (req: Request, res: Response) => {
    const roomPassword = req.body.password
    const participantUID = res.locals.uid
    if (!roomPassword) {
        throw new ForbiddenError('Unable to join a room without a password')
    }
    const room = await getRoom(req.params.roomId)

    if (room.password !== roomPassword) {
        throw new ForbiddenError('Wrong password to join the room')
    }

    const accessToken = createTwilioClientToken(participantUID, room)

    res.send({
        jwtAccessToken: accessToken.toJwt(),
        ttl: TTL_ACCESS_TOKEN_PARTICIPANT_SECONDS,
    } as JoinRoomResponse)
})
