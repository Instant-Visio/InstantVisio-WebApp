import React, { useEffect } from 'react'
import Check from './Check'
import { useTranslation } from 'react-i18next'
import useCameraMicrophonePermission, {
    STATE_GRANTED,
} from '../../../hooks/useCameraMicrophonePermission'

const CameraMicrophonePermission = ({ onGranted }) => {
    const { t } = useTranslation('videocall')
    const permissionResult = useCameraMicrophonePermission('camera')

    useEffect(() => {
        if (permissionResult === STATE_GRANTED) {
            onGranted()
        }
    }, [permissionResult])

    return (
        <>
            <Check
                state={permissionResult}
                i18nKey="permissions.camera"
                i18nInstance={t}
            />
        </>
    )
}

export default CameraMicrophonePermission
