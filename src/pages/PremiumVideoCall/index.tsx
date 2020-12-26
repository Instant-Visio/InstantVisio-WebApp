/**
 * This file was modified by
 * Mattia Primavera <sconqua@gmail.com>
 */

import React from 'react'

import { CssBaseline } from '@material-ui/core'
import { MuiThemeProvider } from '@material-ui/core/styles'

import App from './App'
import AppStateProvider, { useAppState } from './state'
import {
    // BrowserRouter as Router,
    Redirect,
    Switch,
} from 'react-router-dom'
import ErrorDialog from './components/ErrorDialog/ErrorDialog'
// import LoginPage from './components/LoginPage/LoginPage'
import PrivateRoute from './components/PrivateRoute/PrivateRoute'
import theme from './theme'
import './types'
import { VideoProvider } from './components/VideoProvider'
import useConnectionOptions from './utils/useConnectionOptions/useConnectionOptions'
import UnsupportedBrowserWarning from './components/UnsupportedBrowserWarning/UnsupportedBrowserWarning'

const TwilioVideoApp = () => {
    const { error, setError } = useAppState()
    const connectionOptions = useConnectionOptions()

    return (
        <UnsupportedBrowserWarning>
            <VideoProvider options={connectionOptions} onError={setError}>
                <ErrorDialog
                    dismissError={() => setError(null)}
                    error={error}
                />
                <App />
            </VideoProvider>
        </UnsupportedBrowserWarning>
    )
}

export const PremiumVideoPage = () => {
    return (
        <MuiThemeProvider theme={theme}>
            <CssBaseline />
            <AppStateProvider>
                <Switch>
                    {/*
                        Temporarily commented, since we only access PremiumVideo page through a link
                        containing the room name and password for the moment

                        <PrivateRoute exact path="/premium-video">
                            <TwilioVideoApp />
                        </PrivateRoute>
                    */}
                    <PrivateRoute path="/premium-video/room/:URLRoomName">
                        <TwilioVideoApp />
                    </PrivateRoute>
                    {/* <Route path="/premium-video/login">
                        <LoginPage />
                    </Route> */}
                    <Redirect to="/" />
                </Switch>
            </AppStateProvider>
        </MuiThemeProvider>
    )
}
