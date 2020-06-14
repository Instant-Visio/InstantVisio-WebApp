import React, { useEffect } from 'react'
import { Route, withRouter, Switch } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import './App.scss'
import {
    Home,
    LegalMentions,
    PersonalData,
    Blog,
    Credits,
    MediaNews,
    Newsletter,
    NotFound,
} from '../../pages'
import { gdprHandler } from '../../utils/gdpr'
import VideoCallPrecheck from '../../pages/VideoCall/VideoCallPrecheck'

const App = () => {
    const { t } = useTranslation()

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

    return (
        <div className="App">
            <Switch>
                <Route path="/" exact component={Home} />
                <Route
                    path={`/${t('url.video-call')}/:videoName`}
                    component={VideoCallPrecheck}
                />
                <Route
                    path={`/${t('url.legal-mentions')}`}
                    exact
                    component={LegalMentions}
                />
                <Route
                    path={`/${t('url.personal-data')}`}
                    exact
                    component={PersonalData}
                />
                <Route path={`/${t('url.blog')}`} exact component={Blog} />
                <Route
                    path={`/${t('url.blog')}/:post`}
                    exact
                    component={Blog}
                />
                <Route
                    path={`/${t('url.credits')}`}
                    exact
                    component={Credits}
                />
                <Route
                    path={`/${t('url.media')}`}
                    exact
                    component={MediaNews}
                />
                <Route
                    path={`/${t('url.newsletter')}`}
                    exact
                    component={Newsletter}
                />
                <Route component={NotFound} />
            </Switch>
        </div>
    )
}

// withRouter to pass props to components
export default withRouter(App)
