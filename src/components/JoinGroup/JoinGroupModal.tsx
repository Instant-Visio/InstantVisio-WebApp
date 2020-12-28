import React, { useEffect } from 'react'
import JoinGroupForm from './JoinGroupForm'
import Modal from '../Modal/Modal'
import { selectRegistrationToken, selectToken } from '../App/userSelector'
import { useSelector, useDispatch } from 'react-redux'
import { selectJoinGroupModal } from './joinGroupModalSelector'
import { hideJoinGroupModal } from './joinGroupModalActions'
import { Api } from '../../services/api'
import {
    showErrorMessage,
    showSuccessMessage,
} from '../App/Snackbar/snackbarActions'
import { useTranslation } from 'react-i18next'

const JoinGroupModal = ({}) => {
    const { isDisplayed } = useSelector(selectJoinGroupModal)
    const dispatch = useDispatch()
    const { t } = useTranslation('join-group-form')
    const token = useSelector(selectToken)
    const registrationToken = useSelector(selectRegistrationToken)

    useEffect(() => {
        if (!registrationToken && isDisplayed) {
            dispatch(showErrorMessage(t('missing-registration-token')))
        }
    })

    const onSubmit = async (values, { setSubmitting }) => {
        const { name: groupName, password: groupPassword } = values
        console.log('values:', values)
        setSubmitting(true)
        try {
            const api = new Api(token)
            await api.joinGroup(groupName, groupPassword, registrationToken)
            dispatch(showSuccessMessage(t('success', { groupName })))
            setTimeout(() => dispatch(hideJoinGroupModal()), 250)
        } catch (e) {
            console.log('Join group error: ', e)
            dispatch(showErrorMessage(t('error', { groupName })))
        }
        setSubmitting(false)
    }

    const handleClose = () => {
        dispatch(hideJoinGroupModal())
    }

    return (
        <Modal isOpened={isDisplayed} onClose={handleClose}>
            <JoinGroupForm onFormSubmit={onSubmit} />
        </Modal>
    )
}

export default JoinGroupModal
