import React from 'react'
import { authInstance, firebaseAuth } from '../../firebase/firebase'
import { StyledFirebaseAuth } from 'react-firebaseui'
import { EMULATORS } from '../../constants'
import { auth as firebaseuiAuth } from 'firebaseui'
import { isAuthEmulatorEnabled } from '../../utils/emulators'
import {
    selectToken,
    isLoading as isLoadingSelector,
} from '../App/userSelector'
import { useSelector } from 'react-redux'

export const isUsingEmulator = () => {
    return process.env.FIREBASE_AUTH_EMULATOR_HOST
}

const uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: 'popup',
    // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
    signInSuccessUrl: '/admin',
    autoUpgradeAnonymousUsers: true,
    // We will display Google and Facebook as auth providers.
    signInOptions: [
        firebaseAuth.GoogleAuthProvider.PROVIDER_ID,
        firebaseAuth.EmailAuthProvider.PROVIDER_ID,
        firebaseuiAuth.AnonymousAuthProvider.PROVIDER_ID,
    ],
    callbacks: {
        signInSuccessWithAuthResult: ({ user }) => {
            console.log('signInSuccessWithAuthResult called')
            return !user.isAnonymous
        },
        signInFailure: async function (error) {
            console.log('Signin failure error: ', error)
        },
    },
}

const Login = () => {
    const hasToken = useSelector(selectToken)
    const isLoading = useSelector(isLoadingSelector)

    if (isAuthEmulatorEnabled()) {
        authInstance.useEmulator(EMULATORS.hosts.auth)
    }

    if (isLoading) {
        //todo loading
        return <div>...loading</div>
    }

    return (
        <div>
            {!hasToken && (
                <StyledFirebaseAuth
                    uiConfig={uiConfig}
                    firebaseAuth={authInstance}
                />
            )}
        </div>
    )
}

export default Login
