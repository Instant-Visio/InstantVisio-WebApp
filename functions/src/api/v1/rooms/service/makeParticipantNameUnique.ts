import { twilioClient } from './twilioClient'
import { RoomId } from '../../../../types/Room'
import { LOTR_NAMES } from '../../utils/LOTR_NAMES'

export const makeParticipantNameUnique = async (
    roomId: RoomId,
    requestedParticipantName?: string
) => {
    const participantName =
        requestedParticipantName ||
        LOTR_NAMES[Math.floor(Math.random() * LOTR_NAMES.length)]

    const participants = await twilioClient.video
        .rooms(roomId)
        .participants.list()

    const connectedParticipantNames = participants.reduce(
        (acc: string[], participant) => {
            acc.push(participant.identity)

            return acc
        },
        []
    )

    if (connectedParticipantNames.includes(participantName)) {
        // Participant name must be uniq to prevent other participants having the same name to be disconnected.
        return `${participantName}${~~(Math.random() * 10000)}`
    }

    return participantName
}
