import firebase from 'firebase/app'
import { authInstance } from '../firebase/firebase'
import { EMULATORS } from '../constants'
import { isAuthEmulatorEnabled } from '../utils/emulators'
import { JWTToken } from '../../types/JWT'
import { useSelector } from 'react-redux'
import { selectToken } from '../components/App/userSelector'
import { useEffect } from 'react'

export default async (): Promise<void> => {
    const token = useSelector(selectToken)

    useEffect(() => {
        const anonymousAuth = async (token: JWTToken) => {
            if (!token) {
                try {
                    if (isAuthEmulatorEnabled()) {
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

        anonymousAuth(token)
    }, [token])
}
