export const signInEmulatorEmailPassword = async (
    authInstance: firebase.auth.Auth,
    email: string,
    password: string
): Promise<firebase.auth.UserCredential | undefined> => {
    try {
        const signInResult = await authInstance.createUserWithEmailAndPassword(
            email,
            password
        )

        console.log('SignIn Success:', signInResult)
        return signInResult
    } catch (error) {
        if (error.code === 'auth/email-already-in-use') {
            console.log('SignIn error: account already exists ', error)
            try {
                const loginResult = await authInstance.signInWithEmailAndPassword(
                    email,
                    password
                )
                console.log('Login Success:', loginResult)
                return loginResult
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
