import React from 'react'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { TEST_ACCOUNTS } from '../../constants'
import { signInEmulatorEmailPassword } from '../../utils/emulators'

const { paidUser, unpaidUser, overQuotaUser } = TEST_ACCOUNTS

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
            <Button onClick={() => signInWithEmailAndPassword(paidUser)}>
                Paid
            </Button>
            <Button onClick={() => signInWithEmailAndPassword(unpaidUser)}>
                Unpaid
            </Button>
            <Button onClick={() => signInWithEmailAndPassword(overQuotaUser)}>
                OverQuota
            </Button>
            <Link to="premium-video">Go to Premium Video</Link>
        </>
    )
}
