import React, { useEffect, useState } from 'react'
import Check from './Check'
import {
    STATE_DENIED,
    STATE_GRANTED,
    STATE_WAITING,
} from './PermissionConstants'
import { Button } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import DailyIframe from '@daily-co/daily-js'
import { getLocale } from '../../../i18n/helper'

const BrowserCheck = ({ onGranted }) => {
    const { t } = useTranslation('videocall')
    const [state, setState] = useState(STATE_WAITING)
    const { language } = getLocale()

    useEffect(() => {
        const supportedBrowserData = DailyIframe.supportedBrowser()
        if (supportedBrowserData.supported) {
            setState(STATE_GRANTED)
            onGranted()
            return
        }

        setState(STATE_DENIED)
    }, [onGranted])

    const installLink = `https://www.google.com/intl/${language}/chrome/`

    return (
        <>
            <Check state={state} i18nKey="permissions.browser" />
            {state === STATE_DENIED && (
                <Button href={installLink}>
                    {t('permissions.browser.install')}
                </Button>
            )}
        </>
    )
}

export default BrowserCheck
