import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectLoginModal } from './loginModalSelector'
import { hideLoginModal } from './loginModalActions'
import Login from '../Login/Login'
import Modal from '../Modal/Modal'
import Button from '@material-ui/core/Button'
import {
    isAuthEmulatorEnabled,
    signInEmulatorEmailPassword,
} from '../../utils/emulators'
import { TEST_ACCOUNTS } from '../../constants'
import { authInstance } from '../../firebase/firebase'
const { premiumUser, freeUser, overQuotaUser } = TEST_ACCOUNTS

export default function LoginModal() {
    const { isDisplayed } = useSelector(selectLoginModal)
    const dispatch = useDispatch()
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
        <Modal
            isOpened={isDisplayed}
            onClose={() => {
                dispatch(hideLoginModal())
            }}>
            <Login />
            {isAuthEmulatorEnabled() && (
                <>
                    <Button
                        onClick={() => signInWithEmailAndPassword(premiumUser)}>
                        Paid
                    </Button>
                    <Button
                        onClick={() => signInWithEmailAndPassword(freeUser)}>
                        Unpaid
                    </Button>
                    <Button
                        onClick={() =>
                            signInWithEmailAndPassword(overQuotaUser)
                        }>
                        OverQuota
                    </Button>
                </>
            )}
        </Modal>
    )
}
