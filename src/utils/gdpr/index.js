import * as consents from './consents'
import { CONSENT_NECESSARY } from './constants'

const hasCookiebot = () => window.Cookiebot
const EVENT_LISTENER_ACCEPT = 'accept'
const EVENT_LISTENER_DECLINE = 'decline'

const listener = (eventListenerType) => {
    if (!hasCookiebot()) {
        return
    }

    const cookiebotConsents = Object.entries(window.Cookiebot.consent)
    const ivConsents = Object.values(consents)

    if (
        window.Cookiebot.consent.necessary &&
        eventListenerType === EVENT_LISTENER_DECLINE
    ) {
        ivConsents
            .filter((item) => item.type !== CONSENT_NECESSARY)
            .forEach((item) => item.decline())
    } else {
        cookiebotConsents.forEach(([type, value]) => {
            ivConsents
                .filter((item) => item.type === type)
                .forEach((item) => {
                    const { accept, decline } = item
                    if (
                        eventListenerType === EVENT_LISTENER_ACCEPT &&
                        !!value
                    ) {
                        accept()
                    } else {
                        decline()
                    }
                })
        })
    }
}

export const gdprHandler = () => {
    window.addEventListener('CookiebotOnAccept', () =>
        listener(EVENT_LISTENER_ACCEPT)
    )
    window.addEventListener('CookiebotOnDecline', () =>
        listener(EVENT_LISTENER_DECLINE)
    )
}

export const showPreferencesDialog = () => {
    if (hasCookiebot()) {
        window.Cookiebot.show()
    }
}
