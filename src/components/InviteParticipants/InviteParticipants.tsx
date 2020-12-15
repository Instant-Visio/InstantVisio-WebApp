import React, { useState } from 'react'
import InviteForm from './InviteForm'
import Modal from '../Modal/Modal'
import Button from '@material-ui/core/Button'
import { selectToken } from '../../components/App/userSelector'
import { useSelector } from 'react-redux'
import { Api } from '../../services/api'
import { RoomId } from '../../../types/Room'

const InviteParticipants = ({
    roomId,
    hostName,
}: {
    roomId: RoomId
    hostName: string
}) => {
    const token = useSelector(selectToken)
    const [isModalOpened, setIsModalOpened] = useState(false)
    const [hasError, setHasError] = useState(false)
    const error = {
        code: '500',
    }

    const onSubmit = async (values, { setSubmitting }) => {
        const { participantAddresses } = values
        const addresses = participantAddresses.split(' ').map((email) => ({
            email,
            lang: 'fr',
        }))
        console.log('On submit called: ', addresses)

        try {
            const api = new Api(token)
            await api.inviteParticipants(roomId, hostName, addresses)
            setTimeout(() => setIsModalOpened(false), 500)
        } catch (e) {
            console.log('An error occurred inviting participants: ', e)
            setHasError(true)
        }
        setSubmitting(false)
    }

    const handleClose = () => {
        setIsModalOpened(false)
    }

    const handleOpen = () => {
        setIsModalOpened(true)
    }

    return (
        <>
            <Button onClick={handleOpen}>Add participants</Button>

            <Modal isOpened={isModalOpened} onClose={handleClose}>
                <InviteForm
                    onSubmit={onSubmit}
                    error={hasError ? error : false}
                />
            </Modal>
        </>
    )
}

export default InviteParticipants
