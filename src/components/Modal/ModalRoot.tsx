import React from 'react'
//TODO maybe use dynamic import
import Newsletter from '../NewsletterModal/NewsletterModal'
import { useSelector, useDispatch } from 'react-redux'
import { selectModal } from './modalSelector'
import { hideModal } from './modalAction'

const modals = { Newsletter }

export default function ModalRoot() {
    const { modalType, isDisplayed } = useSelector(selectModal)
    const dispatch = useDispatch()
    const ModalComponent = modals[modalType]

    if (!modalType || !ModalComponent) {
        return null
    }

    const onClose = () => dispatch(hideModal())

    return <ModalComponent isOpened={isDisplayed} onClose={onClose} />
}
