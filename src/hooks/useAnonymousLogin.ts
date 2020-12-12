import firebase from 'firebase/app'
import { authInstance } from '../firebase/firebase'
import { EMULATORS } from '../constants'
import { isAuthEmulatorEnabled } from '../utils/emulators'
import { JWTToken } from '../../types/JWT'

export default async (token: JWTToken): Promise<void> => {
    if (!token) {
        try {
            if (isAuthEmulatorEnabled()) {
                console.log('Using auth emulator')
                authInstance.useEmulator(EMULATORS.hosts.auth)
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
