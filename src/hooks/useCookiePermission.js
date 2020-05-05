import React, { useEffect, useState } from 'react'
import { getCookieBot, hasCookiebot } from '../utils/gdpr'
import {
    STATE_DENIED,
    STATE_GRANTED,
    STATE_WAITING,
} from '../pages/VideoCall/permissions/PermissionConstants'

export default function useCookiePermission(name) {
    const [result, setResult] = useState(STATE_WAITING)

    useEffect(() => {
        if (window.location.hostname === 'localhost') {
            setResult(STATE_GRANTED)
            return
        }
        const acceptListener = () => {
            setResult(STATE_GRANTED)
        }
        const declineListener = () => {
            if (getCookieBot().consent.necessary) {
                setResult(STATE_GRANTED)
            } else {
                setResult(STATE_DENIED)
            }
        }

        window.addEventListener('CookiebotOnAccept', acceptListener)
        window.addEventListener('CookiebotOnDecline', declineListener)

        if (hasCookiebot() && !getCookieBot().consent.necessary) {
            getCookieBot().renew()
        }

        return () => {
            window.removeEventListener('CookiebotOnAccept', acceptListener)
            window.removeEventListener('CookiebotOnDecline', declineListener)
        }
    }, [name])
    return result
}
