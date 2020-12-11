import React, { useEffect } from 'react'
import './App.scss'
import { gdprHandler } from '../../utils/gdpr'
import Router from './router'
import { IonApp, IonHeader } from '@ionic/react'
import SwipeableTemporaryDrawer from '../SwipeableTemporaryDrawer/SwipeableTemporaryDrawer'
import { Navbar } from 'react-bootstrap'
import useDetectMobileOrTablet from '../../hooks/useDetectMobileOrTablet'
import styled from 'styled-components'
import { IonReactRouter } from '@ionic/react-router'
import Login from '../Login'

declare global {
    interface Window {
        iv: any
        Cookiebot: any
        $crisp: any
    }
}

const NavbarContainer = styled.div`
    position: 'relative';
    margin-left: 40%;
`

const App = () => {
    const isMobile = useDetectMobileOrTablet()

    useEffect(() => {
        // when using vh and vw units in css:
        // to make sure the height taken into account
        // is the whole window size,
        // not the visible window size
        // (critical on mobile, where, on click on the contact form inputs,
        // the keyboard appears and takes half of the window size,
        // which shrinks the form size - unpleasant user experience)
        if (!window.location.pathname.includes('visio')) {
            setTimeout(() => {
                const viewheight = window.innerHeight
                const viewwidth = window.innerWidth
                const viewport = document.querySelector('meta[name=viewport]')
                viewport?.setAttribute(
                    'content',
                    `height=${viewheight}, width=${viewwidth}, initial-scale=1.0`
                )
            }, 300)
        }

        gdprHandler()
    }, [])

    return (
        <IonApp className="App">
            <Login />

            <IonReactRouter>
                {isMobile && (
                    <IonHeader id="topbar">
                        <Navbar bg="light" variant="dark">
                            <SwipeableTemporaryDrawer />
                            <NavbarContainer />
                        </Navbar>
                    </IonHeader>
                )}
                <Router />
            </IonReactRouter>
        </IonApp>
    )
}

export default App
