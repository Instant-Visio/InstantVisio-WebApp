import { TEST_USER } from '../constants'
import 'firebase/auth'

export const signInWithAuthEmulator = async (
    authInstance: firebase.auth.Auth
): Promise<void> => {
    const { email, password } = TEST_USER
    try {
        const signInResult = await authInstance.createUserWithEmailAndPassword(
            email,
            password
        )

        console.log('SignIn Success:', signInResult)
    } catch (error) {
        if (error.code === 'auth/email-already-in-use') {
            console.log('SignIn error: account already exists ', error)
            try {
                const loginResult = await authInstance.signInWithEmailAndPassword(
                    email,
                    password
                )
                console.log('Login Success:', loginResult)
                return
            } catch (error) {
                console.log('Login error:', error)
            }
        }
        console.log('SignIn error', error)
    }
}

export const isAuthEmulatorEnabled = (): boolean => {
    return Boolean(process.env.REACT_APP_AUTH_EMULATOR_ENABLED)
}
