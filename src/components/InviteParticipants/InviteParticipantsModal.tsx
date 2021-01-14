import React from 'react'
import Modal from '../Modal/Modal'
import { ModalProps } from '../Modal/types'
import InviteParticipantsForm from './InviteParticipantsForm'
import RoomUrlCopyLink from '../RoomUrlCopyLink/RoomUrlCopyLink'
import { Box } from '@material-ui/core'


export default function InviteParticipantsModal({
    onClose,
    isOpened,
}: ModalProps) {
    return (
        <Modal isOpened={isOpened} onClose={onClose}>
            <InviteParticipantsForm />
            <Box m={4} />
            <RoomUrlCopyLink/>
        </Modal>
    )
}
