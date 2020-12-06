import firebase from 'firebase/app'
import { authInstance } from '../firebase/firebase'
import { authEmulatorHost } from '../constants'

export default async (token: string) => {
    if (!token) {
        try {
            if (process.env.REACT_APP_LOCAL_DEVELOPMENT) {
                console.log('Using auth emulator')
                authInstance.useEmulator(authEmulatorHost)
            }
            await firebase.auth().signInAnonymously()
            console.log('User signed up anonymously...')
        } catch (error) {
            console.log(
                `Error anonymous login: ${error.message}, code: ${error.code}`
            )
        }
    }
}
