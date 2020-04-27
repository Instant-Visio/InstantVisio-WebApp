import firebase from 'firebase/app'
import 'firebase/analytics'
import get from 'lodash/get'

const hasCookiebot = () => window.Cookiebot

const cookieBotAcceptListener = () => {
    if (hasCookiebot() && get(window, 'Cookiebot.consent.statistics')) {
        firebase.analytics()
    }
}

const cookieBotDeclineListener = () => {
    if (hasCookiebot() && get(window, 'Cookiebot.consent.statistics')) {
        firebase.analytics().setAnalyticsCollectionEnabled(false)
    }
}

export const cookieHandler = () => {
    window.addEventListener('CookiebotOnAccept', cookieBotAcceptListener)
    window.addEventListener('CookiebotOnDecline', cookieBotDeclineListener)
}

export const showDialogPreferences = () => {
    if (hasCookiebot()) {
        window.Cookiebot.show()
    }
}
