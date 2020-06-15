import React, { useState } from 'react'
import { Modal, Button } from 'react-bootstrap'
import Newsletter from './index'
import { useTranslation } from 'react-i18next'

export default function NewsletterModal() {
    const { t } = useTranslation('newsletter')

    const [show, setShow] = useState(false)

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    return (
        <>
            <p variant="primary" onClick={handleShow}>
                {t('title')}
            </p>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title> {t('title')}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Newsletter />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        {t('buttons.close.label')}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
