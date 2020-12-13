import React, { useState } from 'react'
import InviteForm from './InviteForm'
import Modal from '../Modal/Modal'
import Button from '@material-ui/core/Button'
import { selectToken } from '../../utils/selectors'
import { useSelector } from 'react-redux'
import { Api } from '../../services/api'

const InviteParticipants = () => {
    const token = useSelector(selectToken)
    const [isModalOpened, setIsModalOpened] = useState(false)

    const onSubmit = (values, { setSubmitting }) => {
        const { participantAddresses } = values
        const addresses = participantAddresses.split(' ').map((email) => ({
            email,
            lang: 'fr',
        }))
        console.log('On submit called: ', addresses)

        try {
            const api = new Api(token)
            api.inviteParticipants('fake-room-id', 'test-hostname', addresses)
        } catch (e) {
            console.log('An error occurred inviting participants')
        }
        setSubmitting(false)
        setIsModalOpened(false)
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
                <InviteForm onSubmit={onSubmit} />
            </Modal>
        </>
    )
}

export default InviteParticipants
