import { Request, Response } from 'express'

/**
 * @swagger
 * /v1/rooms/:
 *   get:
 *     description: List created rooms.
 *     tags: ['rooms']
 *     responses:
 *       200:
 *         description: All the rooms linked to this token
 */
export const getRooms = async (req: Request, res: Response) => {
    try {
        res.send('Hello world')
    } catch (error) {
        console.error(error) // eslint-disable-line no-console
        res.status(500).end()
    }
}
