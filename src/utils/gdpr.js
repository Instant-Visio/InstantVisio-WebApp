import firebase from 'firebase/app'
import 'firebase/analytics'

const hasCookiebot = () => window.Cookiebot

const acceptListener = () => {
    if (hasCookiebot() && window.Cookiebot.consent.statistics) {
        firebase.analytics()
    }
}

const declineListener = () => {
    if (hasCookiebot() && !window.Cookiebot.consent.statistics) {
        firebase.analytics().setAnalyticsCollectionEnabled(false)
    }
}

export const gdprHandler = () => {
    window.addEventListener('CookiebotOnAccept', acceptListener)
    window.addEventListener('CookiebotOnDecline', declineListener)
}

export const showPreferencesDialog = () => {
    if (hasCookiebot()) {
        window.Cookiebot.show()
    }
}
