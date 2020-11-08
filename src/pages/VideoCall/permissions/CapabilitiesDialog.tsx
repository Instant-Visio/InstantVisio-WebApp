import React, { useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import CameraMicrophonePermission from './CameraMicrophonePermission'
import styled from 'styled-components'
import CookiePermission from './CookiePermission'
import BrowserCheck from './BrowserCheck'

const CapabilitiesDialog = ({ onGranted, onSkip }) => {
    const { t } = useTranslation('videocall')
    const [dialogDisplayed, setDialogDisplay] = useState(true)
    const [checksPass, setCheckPass] = useState(false)
    const [grantedMap, setGrantedMap] = useState({
        cameraMicrophoneGranted: false,
        cookieGranted: false,
        browser: false,
    })

    const onCheckPass = (checkName) => {
        if (checksPass) {
            return
        }
        if (!grantedMap[checkName]) {
            setGrantedMap({
                ...grantedMap,
                [checkName]: true,
            })
        }
        if (
            Object.values(grantedMap).filter((value) => !!value).length ===
            Object.values(grantedMap).length
        ) {
            setCheckPass(true)
            setTimeout(() => {
                setDialogDisplay(false)
                onGranted && onGranted()
            }, 5000)
        }
    }

    const userHideDialog = () => {
        setDialogDisplay(false)
        onSkip && onSkip()
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
    }, [grantedMap])

    return (
        <Modal
            show={dialogDisplayed}
            onHide={userHideDialog}
            size="sm"
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
                <CookiePermission
                    onGranted={() => {
                        onCheckPass('cookieGranted')
                    }}
                />
                <BrowserCheck
                    onGranted={() => {
                        onCheckPass('browser')
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
