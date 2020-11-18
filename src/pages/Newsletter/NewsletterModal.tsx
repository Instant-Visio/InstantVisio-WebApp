import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import Newsletter from './Newsletter'
import { useTranslation } from 'react-i18next'

export default function NewsletterModal() {
    const { t } = useTranslation('newsletter')

    const [show, setShow] = useState(false)

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    return (
        <>
            {/* TODO check if we can use variant="primary" attr on a p element */}
            <p onClick={handleShow}>{t('title')}</p>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header
                    style={{ padding: '0.5rem 0.5rem' }}
                    closeButton></Modal.Header>
                <Modal.Body style={{ padding: '0rem' }}>
                    <Newsletter />
                </Modal.Body>
            </Modal>
        </>
    )
}
