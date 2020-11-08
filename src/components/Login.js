import React, { useEffect, useState } from 'react'
import { authInstance, firebaseAuth } from '../firebase/firebase'
import { StyledFirebaseAuth } from 'react-firebaseui'
import { Modal, Button } from 'react-bootstrap'

const uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: 'popup',
    // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
    signInSuccessUrl: '/',
    // We will display Google and Facebook as auth providers.
    signInOptions: [firebaseAuth.GoogleAuthProvider.PROVIDER_ID],
    callbacks: {
        // Avoid redirects after sign-in.
        signInSuccessWithAuthResult: () => false,
    },
}

const Login = ({}) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    useEffect(() => {
        return authInstance.onAuthStateChanged((user) => {
            if (user) {
                setIsLoggedIn(true)
                console.log('user logged in', user)
            } else {
                // Logged out
            }
        })
    })

    return (
        <>
            <Modal.Dialog>
                <Modal.Header closeButton>
                    <Modal.Title>Modal title</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <StyledFirebaseAuth
                        uiConfig={uiConfig}
                        firebaseAuth={authInstance}
                    />
                    {isLoggedIn && <Button onClick={() => {}} />}
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary">Close</Button>
                    <Button variant="primary">Save changes</Button>
                </Modal.Footer>
            </Modal.Dialog>
        </>
    )
}

export default Login
