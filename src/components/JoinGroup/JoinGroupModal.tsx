import React, { useEffect } from 'react'
import JoinGroupForm from './JoinGroupForm'
import Modal from '../Modal/Modal'
import { selectRegistrationToken } from '../App/userSelector'
import { useSelector, useDispatch } from 'react-redux'
import { selectJoinGroupModal } from './joinGroupModalSelector'
import { hideJoinGroupModal, joinGroup } from './joinGroupModalActions'
import { showErrorMessage } from '../App/Snackbar/snackbarActions'
import { useTranslation } from 'react-i18next'

const JoinGroupModal = () => {
    const { isDisplayed } = useSelector(selectJoinGroupModal)
    const dispatch = useDispatch()
    const { t } = useTranslation('join-group-form')
    const registrationToken = useSelector(selectRegistrationToken)

    useEffect(() => {
        if (!registrationToken && isDisplayed) {
            dispatch(showErrorMessage(t('missing-registration-token')))
        }
    })

    const onSubmit = async (joinGroupParams, { setSubmitting }) => {
        setSubmitting(true)
        dispatch(joinGroup(t, joinGroupParams))
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
