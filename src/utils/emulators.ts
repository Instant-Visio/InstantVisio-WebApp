import { testUser } from '../constants'
export const signInWithAuthEmulator = async (authInstance) => {
    const { email, password } = testUser
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
