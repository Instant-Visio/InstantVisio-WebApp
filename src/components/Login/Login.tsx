import React from 'react'
import { authInstance, firebaseAuth } from '../../firebase/firebase'
import { StyledFirebaseAuth } from 'react-firebaseui'
import { EMULATORS } from '../../constants'
import { isAuthEmulatorEnabled } from '../../utils/emulators'
import { isLoading as isLoadingSelector } from '../App/userSelector'
import { useSelector, useDispatch } from 'react-redux'
import { hideBackdrop, showBackdrop } from '../App/Backdrop/backdropActions'

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
    ],
    callbacks: {
        signInSuccessWithAuthResult: ({ user }) => {
            return !user.isAnonymous
        },
        signInFailure: async function (error) {
            console.log('Signin failure error: ', error)

            // For merge conflicts, the error.code will be
            // 'firebaseui/anonymous-upgrade-merge-conflict'.
            if (error.code !== 'firebaseui/anonymous-upgrade-merge-conflict') {
                return Promise.resolve()
            }
            // The credential the user tried to sign in with.
            var cred = error.credential
            // Copy data from anonymous user to permanent user and delete anonymous
            // user.
            // ...
            // Finish sign-in after data is copied.
            await authInstance.signInWithCredential(cred)
            return
        },
    },
}

const Login = () => {
    const isLoading = useSelector(isLoadingSelector)
    const dispatch = useDispatch()

    if (isAuthEmulatorEnabled()) {
        authInstance.useEmulator(EMULATORS.hosts.auth)
    }

    if (isLoading) {
        dispatch(showBackdrop())
    } else {
        dispatch(hideBackdrop())
    }

    return (
        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={authInstance} />
    )
}

export default Login
