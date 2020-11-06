import firebase from 'firebase/app'
import 'firebase/analytics'
import { CONSENT_STATISTICS } from '../constants'

export default {
    type: CONSENT_STATISTICS,
    accept: () => {
        firebase.analytics()
    },
    decline: () => {
        firebase.analytics().setAnalyticsCollectionEnabled(false)
    },
}
