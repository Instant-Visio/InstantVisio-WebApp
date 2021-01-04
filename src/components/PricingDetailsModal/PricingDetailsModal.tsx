import React from 'react'
import { Modal, Button } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import PricingDetails from './PricingDetails'

export default function PricingDetailsModal(props) {
    const { t } = useTranslation(['common', 'pricing-details'])

    return (
        <Modal
            {...props}
            size="xl"
            aria-labelledby="contained-modal-title-vcenter"
            centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Estimation
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <PricingDetails />
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>
                    {t('modal.close-button')}
                </Button>
            </Modal.Footer>
        </Modal>
    )
}
