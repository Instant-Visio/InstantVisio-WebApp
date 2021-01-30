import { Request, Response } from 'express'
import { wrap } from 'async-middleware'
import {
    ForbiddenError,
    RoomEndedError,
    RoomNotFoundError,
    RoomNotStartedOrExpiredError,
} from '../../errors/HttpError'
import {
    createTwilioClientToken,
    TTL_ACCESS_TOKEN_PARTICIPANT_SECONDS,
} from './service/createTwilioClientToken'
import { createRoom } from './createRoom'
import { UID } from '../../../types/uid'
import {
    isStatusEnded,
    isStatusUndefined,
    Room,
    RoomId,
} from '../../../types/Room'
import { RoomDao } from '../../../db/RoomDao'
import { makeParticipantNameUnique } from './service/makeParticipantNameUnique'
import { createTwilioRoom } from './service/createTwilioRoom'
import { ROOM_MAX_DURATION_MILLISECONDS } from '../../../constants'
import { Timestamp } from '../../../firebase/firebase'

/**
 * @swagger
 * /v1/rooms/{roomId}/join:
 *   post:
 *     description: Request to join an existing room. This will retrieve the client JWT access token (if granted) to join the room using the Twilio Video JS SDK. <br/> If the room does not exist, and user is allowed (subscription active and not over quota), the room will be created before joining it. A room is ended 24 hours after startAt time, a room ended cannot be joined anymore.
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
 *       - name: participantName
 *         description: The participant name. This is used to ensure the participant name is unique
 *         in: x-www-form-urlencoded
 *         required: false
 *         type: string
 *     responses:
 *       200:
 *         description: Room access granted
 *         content:
 *           application/json:
 *             schema:
 *               example: {
 *                   jwtAccessToken: "aZxo2xsk.IaZxo.2xskI",
 *                   ttl: 14400,
 *                   participantName: "Gandalf1"
 *               }
 *       401:
 *         description: missing authorization bearer token
 *       403:
 *         description: wrong password to join the room, or token not valid
 *       404:
 *         description: room does not exist
 *       410:
 *         description: the room has ended (24 hours after start) and is no longer available
 *       412:
 *         description: authorization header wrong format
 */
export const joinRoom = wrap(async (req: Request, res: Response) => {
    const roomPassword = req.body.password
    const participantUID = res.locals.uid
    const roomId = req.params.roomId

    let room = await getOrCreateRoom(roomId, participantUID, roomPassword)

    const isCurrentAdmin = room.uid === participantUID

    if (room.password !== roomPassword && !isCurrentAdmin) {
        throw new ForbiddenError('Wrong password to join the room')
    }
    if (isStatusEnded(room)) {
        if (isRoomStartedRecently(room.startAt)) {
            await createTwilioRoomAndSaveIt(roomId)
            room = await RoomDao.get(room.id)
        } else {
            throw new RoomEndedError()
        }
    }
    if (isStatusUndefined(room)) {
        if (
            isRoomAlreadyStarted(room.startAt) &&
            isRoomStartedRecently(room.startAt)
        ) {
            await createTwilioRoomAndSaveIt(roomId)
            room = await RoomDao.get(room.id)
        } else {
            throw new RoomNotStartedOrExpiredError()
        }
    }
    const participantName = await makeParticipantNameUnique(
        roomId,
        req.body.participantName
    )
    const accessToken = createTwilioClientToken(
        participantUID,
        room.twilioRoomId,
        participantName
    )

    res.send({
        jwtAccessToken: accessToken.toJwt(),
        ttl: TTL_ACCESS_TOKEN_PARTICIPANT_SECONDS,
        participantName,
        hideChatbot: room.hideChatbot,
    })
})

const getOrCreateRoom = async (
    roomId: RoomId,
    participantUID: UID,
    roomPassword: string
): Promise<Room> => {
    try {
        return await RoomDao.get(roomId)
    } catch (error) {
        if (error instanceof RoomNotFoundError) {
            await createRoom({
                userId: participantUID,
                roomRequestedPassword: roomPassword,
                specificRoomId: roomId,
            })
            return RoomDao.get(roomId)
        } else {
            throw error
        }
    }
}
const createTwilioRoomAndSaveIt = async (roomId: RoomId): Promise<void> => {
    const twilioResponse = await createTwilioRoom(roomId)
    await RoomDao.update({
        id: roomId,
        status: '', // status are filled by Twilio webhook token
        ...twilioResponse,
    })
}

export const isRoomStartedRecently = (startAt: Timestamp): boolean =>
    Date.now() < startAt.toMillis() + ROOM_MAX_DURATION_MILLISECONDS

export const isRoomAlreadyStarted = (startAt: Timestamp): boolean =>
    Date.now() >= startAt.toMillis()
