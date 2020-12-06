import React, { useEffect, useState } from 'react'
import { authInstance, firebaseAuth } from '../firebase/firebase'
import { StyledFirebaseAuth } from 'react-firebaseui'
import { Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import * as actions from '../actions/actions'
import { authEmulatorHost } from '../constants'
import { fetchToken } from '../services/fetch-token'
import { auth as firebaseuiAuth } from 'firebaseui'

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

    if (process.env.REACT_APP_LOCAL_DEVELOPMENT) {
        authInstance.useEmulator(authEmulatorHost)
    }

    useEffect(() => {
        return authInstance.onAuthStateChanged((user) => {
            if (user) {
                if (!token) {
                    fetchToken(user.uid)
                        .then(({ token }) => {
                            setToken(token)
                        })
                        .then(() => setIsLoggedIn(true))
                        .catch((err) => {
                            authInstance.signOut()
                            setIsLoggedIn(false)
                        })
                } else {
                    setToken(token)
                    setIsLoggedIn(true)
                }
            } else {
                // Logged out
                setIsLoggedIn(false)
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
