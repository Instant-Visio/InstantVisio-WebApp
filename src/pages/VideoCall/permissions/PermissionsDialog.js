import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import CameraPermission from './CameraPermission'

const PermissionsDialog = () => {
    const { t } = useTranslation('videocall')
    const [dialogDisplayed, setDialogDisplay] = useState(true)

    return (
        <Modal
            show={dialogDisplayed}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {t('permissions.dialog.title')}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>{t('permissions.dialog.description')}</p>
                <CameraPermission />
            </Modal.Body>
        </Modal>
    )
}

export default PermissionsDialog
