import * as firebase from 'firebase/app'

import 'firebase/analytics'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/remote-config'

const firebaseConfig = {
    appId: process.env.REACT_APP_APPID,
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
}

firebase.initializeApp(firebaseConfig)

export const remoteConfig = firebase.remoteConfig()

remoteConfig.settings = {
    minimumFetchIntervalMillis: 3600000,
}
