import { RoomId } from '../../../../types/Room'

export const formatTwilioRoomId = (roomId: RoomId) => `${roomId}#${Date.now()}`
export const convertTwilioId = (roomName: string): RoomId =>
    roomName.split('#')[0]
