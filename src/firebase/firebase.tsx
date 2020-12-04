import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/functions'
import 'firebase/remote-config'
import 'firebase/auth'
import {
    authEmulatorHost,
    functionsEmulatorHost,
    dbEmulatorHost,
} from '../constants'

const firebaseConfig = {
    appId: process.env.REACT_APP_APPID,
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_LOCAL_DEVELOPMENT
        ? authEmulatorHost
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

if (process.env.NODE_ENV === 'development') {
    firebase.functions().useFunctionsEmulator(functionsEmulatorHost)
    db.settings({
        host: dbEmulatorHost,
        ssl: false,
    })
}

export const functions = {
    newCall: firebase.functions().httpsCallable('newCall'),
    getToken: firebase.functions().httpsCallable('getToken'),
}
