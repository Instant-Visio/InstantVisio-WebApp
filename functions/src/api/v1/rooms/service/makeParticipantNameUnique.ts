import { twilioClient } from './twilioClient'
import { RoomId } from '../../../../types/Room'
import { TwilioConstants } from './TwilioConstants'
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
            if (participant.status === TwilioConstants.STATUS_CONNECTED) {
                acc.push(participant.identity)
            }

            return acc
        },
        []
    )

    if (connectedParticipantNames.includes(participantName)) {
        // Participant name is not unique
        return `${participantName}${~~(Math.random() * 10000)}`
    }

    return participantName
}
