import React from 'react'
import PricingTable from './PricingTable'
import Modal from '../Modal/Modal'
import { ModalProps } from '../Modal/types'

export default function PricingTableModal({ onClose, isOpened }: ModalProps) {
    return (
        <Modal isOpened={isOpened} onClose={onClose}>
            <PricingTable />
            <br />
        </Modal>
    )
}
