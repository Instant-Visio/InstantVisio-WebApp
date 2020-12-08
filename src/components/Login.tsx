import React, { useEffect, useState, useCallback } from 'react'
import { authInstance, firebaseAuth } from '../firebase/firebase'
import { StyledFirebaseAuth } from 'react-firebaseui'
import { Button } from 'react-bootstrap'
import * as actions from '../actions/actions'
import { EMULATORS } from '../constants'
import { fetchToken } from '../services/fetch-token'
import { auth as firebaseuiAuth } from 'firebaseui'
import { isAuthEmulatorEnabled } from '../utils/emulators'
import { JWTToken } from '../../types/JWT'
import { selectToken } from '../utils/selectors'
import { useDispatch, useSelector } from 'react-redux'

const uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: 'popup',
    // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
    signInSuccessUrl: '/',
    autoUpgradeAnonymousUsers: true,
    // We will display Google and Facebook as auth providers.
    signInOptions: [
        firebaseAuth.GoogleAuthProvider.PROVIDER_ID,
        firebaseAuth.EmailAuthProvider.PROVIDER_ID,
        firebaseuiAuth.AnonymousAuthProvider.PROVIDER_ID,
    ],
    callbacks: {
        // Avoid redirects after sign-in.
        signInSuccessWithAuthResult: () => false,
        signInFailure: async function (error) {
            console.log('Signin failure error: ', error)
        },
    },
}

const Login = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const token = useSelector(selectToken)
    const dispatch = useDispatch()

    if (isAuthEmulatorEnabled()) {
        authInstance.useEmulator(EMULATORS.hosts.auth)
    }

    const login = useCallback(
        (token: JWTToken) => {
            dispatch(actions.setToken(token))
            setIsLoggedIn(true)
        },
        [dispatch, setIsLoggedIn]
    )

    const logout = useCallback(() => {
        authInstance.signOut()
        setIsLoggedIn(false)
    }, [setIsLoggedIn])

    useEffect(() => {
        const fetchTokenHandleLoginState = async (user: firebase.User) => {
            try {
                const token = await fetchToken(user.uid)
                login(token)
            } catch (err) {
                logout()
            }
        }

        return authInstance.onAuthStateChanged((user) => {
            if (user) {
                if (token) {
                    login(token)
                } else {
                    fetchTokenHandleLoginState(user)
                }
            } else {
                logout()
            }
        })
    }, [token, login, logout])

    return (
        <div>
            {!isLoggedIn && (
                <StyledFirebaseAuth
                    uiConfig={uiConfig}
                    firebaseAuth={authInstance}
                />
            )}
            {isLoggedIn && (
                <Button
                    onClick={() => {
                        authInstance.signOut()
                    }}>
                    Sign out
                </Button>
            )}
        </div>
    )
}

export default Login
