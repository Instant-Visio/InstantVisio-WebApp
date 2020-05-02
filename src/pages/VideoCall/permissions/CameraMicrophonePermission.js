import React, { useEffect } from 'react'
import Check from './Check'
import useCameraMicrophonePermission, {
    STATE_GRANTED,
} from '../../../hooks/useCameraMicrophonePermission'

const CameraMicrophonePermission = ({ onGranted }) => {
    const permissionResult = useCameraMicrophonePermission('camera')

    useEffect(() => {
        if (permissionResult === STATE_GRANTED) {
            onGranted()
        }
    }, [permissionResult, onGranted])

    return <Check state={permissionResult} i18nKey="permissions.camera" />
}

export default CameraMicrophonePermission
