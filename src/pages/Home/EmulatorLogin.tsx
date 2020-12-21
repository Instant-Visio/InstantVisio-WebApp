import React from 'react'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { TEST_ACCOUNTS } from '../../constants'
import { signInEmulatorEmailPassword } from '../../utils/emulators'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'

const { paidUser, unpaidUser, overQuotaUser } = TEST_ACCOUNTS

const StyledEmulatorLogin = styled.div`
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 1;
`

export const EmulatorLogin = ({ authInstance, token }) => {
    const history = useHistory()
    const isAnonymous = authInstance.currentUser?.isAnonymous
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
        <StyledEmulatorLogin>
            <span>Emulator Signin: </span>
            <Button onClick={() => authInstance.signInAnonymously()}>
                Anonymous
            </Button>
            {token && (
                <>
                    {!isAnonymous && (
                        <Button onClick={() => history.push('/admin')}>
                            Admin
                        </Button>
                    )}
                    <Button
                        onClick={() => {
                            authInstance.signOut()
                        }}>
                        Sign out
                    </Button>
                </>
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
        </StyledEmulatorLogin>
    )
}
