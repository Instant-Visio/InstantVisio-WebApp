import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/functions'
import 'firebase/remote-config'
import 'firebase/auth'
import { EMULATORS } from '../constants'

import { isAuthEmulatorEnabled } from '../utils/emulators'
import { isUsingEmulator } from '../components/Login/Login'

const firebaseConfig = {
    appId: process.env.REACT_APP_APPID,
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: isAuthEmulatorEnabled()
        ? EMULATORS.hosts.auth
        : process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    measurementId: process.env.REACT_APP_MEASUREMENT_ID,
}

const firebaseInstance = firebase.initializeApp(firebaseConfig)
export const firebaseAuth = firebase.auth

export const authInstance = firebaseInstance.auth()

export const remoteConfig = firebase.remoteConfig()
remoteConfig.settings = {
    minimumFetchIntervalMillis: 3600000,
    fetchTimeoutMillis: 60000, // default value used here: https://firebase.google.com/docs/reference/js/firebase.remoteconfig.Settings#fetchtimeoutmillis
}

export const db = firebaseInstance.firestore()

if (isUsingEmulator()) {
    firebase.functions().useFunctionsEmulator(EMULATORS.hosts.functions)
    db.settings({
        host: EMULATORS.hosts.db,
        ssl: false,
    })
}

export const functions = {
    newCall: firebase.functions().httpsCallable('newCall'),
    getToken: firebase.functions().httpsCallable('getToken'),
    callRating: firebase.functions().httpsCallable('callRating'),
}
