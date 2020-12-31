import React from 'react'
import Newsletter from './Newsletter'
import Modal from '../Modal/Modal'
import { ModalProps } from '../Modal/types'

export default function NewsletterModal({ onClose, isOpened }: ModalProps) {
    return (
        <Modal isOpened={isOpened} onClose={onClose}>
            <Newsletter />
        </Modal>
    )
}
