import { useEffect } from 'react'
import { FirebaseCrashlytics } from '@ionic-native/firebase-crashlytics'

export default function useFirebaseCrashlytics() {
    useEffect(() => {
        const initCrashlytics = async () => {
            await FirebaseCrashlytics.initialise()
        }

        initCrashlytics()
    })
}
