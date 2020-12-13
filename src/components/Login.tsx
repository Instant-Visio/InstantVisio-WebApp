import React, { useEffect, useState, useCallback } from 'react'
import { authInstance, firebaseAuth } from '../firebase/firebase'
import { StyledFirebaseAuth } from 'react-firebaseui'
import { Button } from 'react-bootstrap'
import { didSignin, signOut } from '../actions/userActions'
import { EMULATORS } from '../constants'
import { auth as firebaseuiAuth } from 'firebaseui'
import { isAuthEmulatorEnabled } from '../utils/emulators'
import {
    getLoginErrorSelector,
    getTokenSelector,
    isLoadingSelector,
} from '../utils/userSelectors'
import { useDispatch, useSelector } from 'react-redux'

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
            return !user.isAnonymous
        },
        signInFailure: async function (error) {
            console.log('Signin failure error: ', error)
        },
    },
}

const Login = () => {
    const hasToken = useSelector(getTokenSelector)
    const loginError = useSelector(getLoginErrorSelector)
    const isLoading = useSelector(isLoadingSelector)
    const dispatch = useDispatch()

    if (isAuthEmulatorEnabled()) {
        authInstance.useEmulator(EMULATORS.hosts.auth)
    }

    useEffect(() => {
        return authInstance.onAuthStateChanged((user) => {
            dispatch(didSignin(user))
        })
    }, [dispatch])

    if (isLoading) {
        //todo loading
        return <div>...loading</div>
    }

    //temporary ui
    return (
        <div
            style={{
                position: 'absolute',
                left: 0,
                background: '#4444FF55',
                zIndex: 50,
            }}>
            {!hasToken && (
                <StyledFirebaseAuth
                    uiConfig={uiConfig}
                    firebaseAuth={authInstance}
                />
            )}
            {hasToken && (
                <Button
                    onClick={() => {
                        dispatch(signOut())
                    }}>
                    Sign out
                </Button>
            )}
            Temporary LOGIN UI
        </div>
    )
}

export default Login
