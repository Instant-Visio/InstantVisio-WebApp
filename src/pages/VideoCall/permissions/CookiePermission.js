import React, { useEffect } from 'react'
import Check from './Check'
import {
    STATE_GRANTED,
    STATE_WAITING,
} from '../../../hooks/useCameraMicrophonePermission'

const CookiePermission = ({ onGranted }) => {
    const permissionResult = STATE_WAITING

    useEffect(() => {
        if (permissionResult === STATE_GRANTED) {
            onGranted()
        }
    }, [permissionResult, onGranted])

    return <Check state={permissionResult} i18nKey="permissions.cookie" />
}

export default CookiePermission
