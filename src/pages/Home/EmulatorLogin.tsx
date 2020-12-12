import React from 'react'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { TEST_ACCOUNTS } from '../../constants'
import { signInEmulatorEmailPassword } from '../../utils/emulators'

const [FIRST_TEST_ACCOUNT, SECOND_TEST_ACCOUNT] = TEST_ACCOUNTS

export const EmulatorLogin = ({ authInstance, token }) => {
    const signInWithEmailAndPassword = async ({ email, password }) => {
        try {
            const user = await signInEmulatorEmailPassword(
                authInstance,
                email,
                password
            )
            console.log('Signed In with user: ', user)
        } catch (error) {
            const { code, message } = error
            console.log(`Error email auth: ${code}, message: ${message}`)
        }
    }
    return (
        <>
            <span>Emulator Signin: </span>
            <Button onClick={() => authInstance.signInAnonymously()}>
                Anonymous
            </Button>
            {token && (
                <Button
                    onClick={() => {
                        authInstance.signOut()
                    }}>
                    Sign out
                </Button>
            )}
            <Button
                onClick={() => signInWithEmailAndPassword(FIRST_TEST_ACCOUNT)}>
                Email (1)
            </Button>
            <Button
                onClick={() => signInWithEmailAndPassword(SECOND_TEST_ACCOUNT)}>
                Email (2)
            </Button>
            <Link to="premium-video">Go to Premium Video</Link>
        </>
    )
}
