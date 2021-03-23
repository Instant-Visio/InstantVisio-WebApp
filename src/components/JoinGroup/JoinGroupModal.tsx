import React from 'react'
import JoinGroupForm from './JoinGroupForm'
import Modal from '../Modal/Modal'
import { useSelector, useDispatch } from 'react-redux'
import { selectJoinGroupModal } from './joinGroupModalSelector'
import { hideJoinGroupModal, joinGroup } from './joinGroupModalActions'
import { useTranslation } from 'react-i18next'

const JoinGroupModal = () => {
    const { isDisplayed } = useSelector(selectJoinGroupModal)
    const dispatch = useDispatch()
    const { t } = useTranslation('join-group-form')

    const onSubmit = async (joinGroupParams, { setSubmitting }) => {
        setSubmitting(true)
        dispatch(joinGroup(t, joinGroupParams))
        setSubmitting(false)
    }

    const handleClose = () => {
        dispatch(hideJoinGroupModal())
    }

    return (
        <Modal widthModal={300} isOpened={isDisplayed} onClose={handleClose}>
            <JoinGroupForm onFormSubmit={onSubmit} />
        </Modal>
    )
}

export default JoinGroupModal
