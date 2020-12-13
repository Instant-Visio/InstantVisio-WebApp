import { Request, Response } from 'express'
import { wrap } from 'async-middleware'
import { getRoom } from '../../../db/getRoom'
import { ForbiddenError, RoomNotFoundError } from '../../errors/HttpError'
import {
    createTwilioClientToken,
    TTL_ACCESS_TOKEN_PARTICIPANT_SECONDS,
} from './service/createTwilioClientToken'
import { createRoom } from './createRoom'
import { UID } from '../../../types/uid'
import { Room, RoomId } from '../../../types/Room'

/**
 * @swagger
 * /v1/rooms/{roomId}/join:
 *   post:
 *     description: Request to join an existing room. This will retrieve the client JWT access token (if granted) to join the room using the Twilio Video JS SDK. <br/> If the room does not exist, and user is allowed (subscription active and not over quota), the room will be created before joining it.
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
 *                   ttl: 14400
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
    const roomId = req.params.roomId
    if (!roomPassword) {
        throw new ForbiddenError('Unable to join a room without a password')
    }

    const room = await getOrCreateRoom(roomId, participantUID, roomPassword)

    if (room.password !== roomPassword) {
        throw new ForbiddenError('Wrong password to join the room')
    }

    const accessToken = createTwilioClientToken(participantUID, room.id)

    res.send({
        jwtAccessToken: accessToken.toJwt(),
        ttl: TTL_ACCESS_TOKEN_PARTICIPANT_SECONDS,
    })
})

const getOrCreateRoom = async (
    roomId: RoomId,
    participantUID: UID,
    roomPassword: string
): Promise<Room> => {
    try {
        return await getRoom(roomId)
    } catch (error) {
        if (error instanceof RoomNotFoundError) {
            await createRoom(participantUID, roomPassword, roomId)
            return getRoom(roomId)
        } else {
            throw error
        }
    }
}
