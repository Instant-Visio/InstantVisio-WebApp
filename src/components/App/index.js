import React, { useEffect, useReducer } from 'react'
import { Context } from '../../utils/global/context'
import { reducer } from '../../utils/global/reducer'
import './App.scss'
import { gdprHandler } from '../../utils/gdpr'
import Router from './router'
import { useTranslation } from 'react-i18next'
import { IonApp, IonHeader } from '@ionic/react'
import SwipeableTemporaryDrawer from '../../components/SwipeableTemporaryDrawer'
import { Navbar } from 'react-bootstrap'
import useDetectMobileOrTablet from '../../hooks/useDetectMobileOrTablet'
import Lang from '../Lang'
import styled from 'styled-components'
import { IonReactRouter } from '@ionic/react-router'

const NavbarContainer = styled.div`
    position: 'relative';
    margin-left: 40%;
`

const App = () => {
    const { t } = useTranslation()
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
                viewport.setAttribute(
                    'content',
                    `height=${viewheight}px, width=${viewwidth}px, initial-scale=1.0`
                )
            }, 300)
        }

        gdprHandler()
    }, [])

    const initialState = {
        width: window.innerWidth,
        isMobile: window.innerWidth <= 500,
    }
    const [store, dispatch] = useReducer(reducer, initialState)
    const isVideoCallPage = () => {
        return window.location.pathname.indexOf(`/${t('url.video-call')}/`) >= 0
    }

    return (
        <IonApp className="App">
            <IonReactRouter>
                {isMobile && !isVideoCallPage() && (
                    <IonHeader>
                        <Navbar bg="light" variant="dark">
                            <SwipeableTemporaryDrawer></SwipeableTemporaryDrawer>
                            <NavbarContainer>
                                <Lang />
                            </NavbarContainer>
                        </Navbar>
                    </IonHeader>
                )}
                <Context.Provider value={{ store, dispatch }}>
                    <Router />
                </Context.Provider>
            </IonReactRouter>
        </IonApp>
    )
}

export default App
