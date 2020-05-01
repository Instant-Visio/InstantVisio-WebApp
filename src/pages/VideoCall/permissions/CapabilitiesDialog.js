import React, { useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import CameraMicrophonePermission from './CameraMicrophonePermission'
import styled from 'styled-components'

const CapabilitiesDialog = () => {
    const { t } = useTranslation('videocall')
    const [dialogDisplayed, setDialogDisplay] = useState(true)
    const [checksPass, setCheckPass] = useState(false)
    const [grantedMap, setGrantedMap] = useState({
        cameraMicrophoneGranted: false,
    })

    const onCheckPass = (checkName) => {
        setGrantedMap({
            ...grantedMap,
            [checkName]: true,
        })
        if (Object.values(grantedMap).filter((value) => !!value)) {
            setCheckPass(true)
            setTimeout(() => {
                setDialogDisplay(false)
            }, 5000)
        }
    }

    useEffect(() => {
        window.iv = window.iv || {}
        window.iv.displayPermissionDialog = (show) => {
            console.log(grantedMap)
            setDialogDisplay(show)
        }

        return () => {
            window.iv.displayPermissionDialog = null
        }
    }, [])

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
                <CameraMicrophonePermission
                    onGranted={() => {
                        onCheckPass('cameraMicrophoneGranted')
                    }}
                />
                {checksPass && (
                    <SuccessMessage>
                        {t('permissions.dialog.autoclose')}
                    </SuccessMessage>
                )}
            </Modal.Body>
        </Modal>
    )
}

const SuccessMessage = styled.p`
    background: #b1dbb2;
    font-weight: bold;
    border-radius: 6px;
    padding: 12px;
    margin: 16px 8px 0;
`

export default CapabilitiesDialog
