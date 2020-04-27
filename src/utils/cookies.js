import firebase from 'firebase/app'
import 'firebase/analytics'

const hasCookiebot = () => window.Cookiebot

const cookieBotAcceptListener = () => {
    if (hasCookiebot() && window.Cookiebot.consent?.statistics) {
        firebase.analytics()
    }
}

const cookieBotDeclineListener = () => {
    if (hasCookiebot() && window.Cookiebot.consent?.statistics) {
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
