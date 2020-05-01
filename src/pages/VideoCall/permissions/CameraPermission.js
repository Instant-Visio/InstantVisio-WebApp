import React from 'react'
import Check, { STATE_DENIED, STATE_GRANTED, STATE_WAITING } from './Check'
import { useTranslation } from 'react-i18next'

const CameraPermission = ({ onGranted }) => {
    const { t } = useTranslation('videocall')

    return (
        <>
            <Check
                state={STATE_DENIED}
                i18nKey="permissions.camera"
                i18nInstance={t}
            />
            <Check
                state={STATE_GRANTED}
                i18nKey="permissions.camera"
                i18nInstance={t}
            />
            <Check
                state={STATE_WAITING}
                i18nKey="permissions.camera"
                i18nInstance={t}
            />
        </>
    )
}

export default CameraPermission
