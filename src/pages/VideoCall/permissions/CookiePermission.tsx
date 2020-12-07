import React, { useEffect } from 'react'
import Check from './Check'
import {
    STATE_DENIED,
    STATE_GRANTED,
    STATE_WAITING,
} from './PermissionConstants'
import useCookiePermission from 'src/hooks/useCookiePermission'
import { Button } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { getCookieBot, hasCookiebot } from 'src/utils/gdpr'

const CookiePermission = ({ onGranted }) => {
    const { t } = useTranslation('videocall')
    const permissionResult = useCookiePermission()

    useEffect(() => {
        if (permissionResult === STATE_GRANTED) {
            onGranted()
        }
    }, [permissionResult, onGranted])

    useEffect(() => {
        const timer = setTimeout(() => {
            if (permissionResult === STATE_WAITING) {
                onCookieRenewClick()
            }
        }, 5000)

        return () => {
            clearTimeout(timer)
        }
    }, [permissionResult])

    const onCookieRenewClick = () => {
        if (hasCookiebot()) {
            getCookieBot().renew()
        }
    }

    return (
        <>
            <Check state={permissionResult} i18nKey="permissions.cookie" />
            {permissionResult === STATE_DENIED && (
                <Button onClick={onCookieRenewClick}>
                    {t('permissions.cookie.renew')}
                </Button>
            )}
        </>
    )
}

export default CookiePermission
