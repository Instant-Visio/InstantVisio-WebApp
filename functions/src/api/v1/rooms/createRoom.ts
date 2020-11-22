import { Request, Response } from 'express'
import { addRoom } from '../../../db/addRoom'
import { createTwilioRoom } from './service/createTwilioRoom'
import { updateRoom } from '../../../db/updateRoom'
import { RoomId, RoomSid } from '../../../types/Room'

export interface NewRoomResponse {
    roomId: RoomId
    roomSid: RoomSid
}

/**
 * @swagger
 * /v1/rooms/new:
 *   post:
 *     description: Create a new room. This will generate a random room id (9 random a-Z 0-9 chat) and a random password if none provided. The room will have an infinite lifetime though it will probably change in the future.
 *     tags:
 *       - rooms
 *     consumes:
 *     - multipart/form-data
 *     produces:
 *     - application/json
 *     parameters:
 *       - name: password
 *         description: (optional) The room password. If no password, a random one will be generated.
 *         in: x-www-form-urlencoded
 *         required: false
 *         type: string
 *     responses:
 *       201:
 *         description: Room created with success
 *         content:
 *           application/json:
 *             schema:
 *               example: {
 *                   roomSid: "aZxo2xskIaZxo2xskI",
 *                   roomId: "390FJZDms390FJZDms"
 *               }
 *       401:
 *         description: missing authorization bearer token
 *       403:
 *         description: authorization header present but not valid
 *       412:
 *         description: authorization header present but not formatted correctly
 */
export const createRoom = async (req: Request, res: Response) => {
    const roomId = await addRoom(
        res.locals.uid,
        req.body.password || ~~(Math.random() * 999999)
    )
    const roomSid = await createTwilioRoom(roomId)
    await updateRoom({
        roomId,
        roomSid,
    })
    res.send({
        roomId,
        roomSid,
    } as NewRoomResponse)
}
