import React, { useEffect, useState } from 'react'
import { authInstance, firebaseAuth } from '../firebase/firebase'
import { StyledFirebaseAuth } from 'react-firebaseui'
import { Button } from 'react-bootstrap'
import fetchToken from '../hooks/fetchToken'
import { connect } from 'react-redux'
import * as actions from '../actions/actions'
import { authEmulatorHost } from '../constants'

const uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: 'popup',
    // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
    signInSuccessUrl: '/',
    // We will display Google and Facebook as auth providers.
    signInOptions: [
        firebaseAuth.GoogleAuthProvider.PROVIDER_ID,
        firebaseAuth.EmailAuthProvider.PROVIDER_ID,
    ],
    callbacks: {
        // Avoid redirects after sign-in.
        signInSuccessWithAuthResult: () => false,
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
                console.log('User uid: ', user.uid)
                if (!token) {
                    fetchToken(user.uid).then((token) => {
                        console.log('Token saved: ', token)
                        setToken(token)
                        setIsLoggedIn(true)
                        console.log('user logged in', user)
                    })
                } else {
                    setIsLoggedIn(true)
                    console.log('user logged in', user)
                }
            } else {
                // Logged out
            }
        })
    }, [])

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
