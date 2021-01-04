import React from 'react'
import PricingDetails from './PricingDetails'
import Modal from '../Modal/Modal'
import { ModalProps } from '../Modal/types'

export default function PricingDetailsModal({ onClose, isOpened }: ModalProps) {
    return (
        <Modal isOpened={isOpened} onClose={onClose}>
            <PricingDetails />
        </Modal>
    )
}
