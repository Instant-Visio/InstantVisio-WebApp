import React, { useEffect } from 'react'
import { getCookieBot } from '../utils/gdpr'
import {
    STATE_DENIED,
    STATE_GRANTED,
    STATE_WAITING,
} from '../pages/VideoCall/permissions/PermissionConstants'

export default function useCookiePermission(name) {
    const [result, setResult] = React.useState(STATE_WAITING)
    useEffect(() => {
        if (window.location.hostname === 'localhost') {
            setResult(STATE_GRANTED)
            return
        }
        const acceptListener = () => {
            console.log('Cookie bot accepted')
            setResult(STATE_GRANTED)
        }
        const declineListener = () => {
            console.log('Cookie bot CookiebotOnDecline')
            setResult(STATE_DENIED)
        }

        window.addEventListener('CookiebotOnAccept', acceptListener)
        window.addEventListener('CookiebotOnDecline', declineListener)

        getCookieBot().renew()

        return () => {
            window.removeEventListener('CookiebotOnAccept', acceptListener)
            window.removeEventListener('CookiebotOnDecline', declineListener)
        }
    }, [name])
    return result
}
