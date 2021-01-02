import React, { useEffect } from 'react'
import './App.scss'
import { gdprHandler } from '../../utils/gdpr'
import Router from './Router'
import { IonApp, IonHeader } from '@ionic/react'
import { IonReactRouter } from '@ionic/react-router'
import AppBar from './AppBar/AppBar'
import Snackbar from './Snackbar/Snackbar'
import { PushNotifications } from './PushNotifications/PushNotifications'
import LoginModal from '../LoginModal/LoginModal'
import ModalRoot from '../Modal/ModalRoot'
import AuthStateChangedListener from './AuthStateChangedListener/AuthStateChangedListener'
import Backdrop from './Backdrop/Backdrop'
import JoinGroupModal from '../JoinGroup/JoinGroupModal'
declare global {
    interface Window {
        iv: any
        Cookiebot: any
        $crisp: any
    }
}

const App = () => {
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

    const isPremiumVideoPage = () => {
        return window.location.pathname.includes('premium-video')
    }

    return (
        <IonApp className="App">
            <Backdrop />
            <PushNotifications />
            <Snackbar />
            <AuthStateChangedListener />
            <JoinGroupModal />
            <LoginModal />
            <ModalRoot />
            <IonReactRouter>
                {!isPremiumVideoPage() && (
                    <IonHeader id="topbar">
                        <AppBar />
                    </IonHeader>
                )}
                <Router />
            </IonReactRouter>
        </IonApp>
    )
}

export default App
