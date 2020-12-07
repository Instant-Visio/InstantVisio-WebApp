import React, { useEffect, useState } from 'react'
import { authInstance, firebaseAuth } from '../firebase/firebase'
import { StyledFirebaseAuth } from 'react-firebaseui'
import { Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import * as actions from '../actions/actions'
import { EMULATORS } from '../constants'
import { fetchToken } from '../services/fetch-token'
import { auth as firebaseuiAuth } from 'firebaseui'
import { isAuthEmulatorEnabled } from '../utils/emulators'
import { JWTToken } from '../../types/JWT'

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

const Login = ({ token, setToken }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    if (isAuthEmulatorEnabled()) {
        authInstance.useEmulator(EMULATORS.hosts.auth)
    }

    const login = (token: JWTToken) => {
        setToken(token)
        setIsLoggedIn(true)
    }

    const logout = () => {
        authInstance.signOut()
        setIsLoggedIn(false)
    }

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
    }, [setToken, setIsLoggedIn, token])

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

const mapStateToProps = (state) => {
    return {
        token: state.token,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setToken: (token) => dispatch(actions.setToken(token)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
