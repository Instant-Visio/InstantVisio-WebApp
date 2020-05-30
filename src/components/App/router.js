import { Switch } from 'react-router-dom'
import React from 'react'
import {
    Home,
    LegalMentions,
    PersonalData,
    Blog,
    Credits,
    MediaNews,
    NotFound,
} from '../../pages'

import VideoCallPrecheck from '../../pages/VideoCall/VideoCallPrecheck'
import { useTranslation } from 'react-i18next'
import { Route } from 'react-router-dom'

const Router = () => {
    const { t } = useTranslation()

    return (
        <IonReactRouter>
            <IonRouterOutlet>
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
                    path={`/${t('url.media')}`}
                    exact
                    component={MediaNews}
                />

                <Route
                    path={`/${t('url.credits')}`}
                    exact
                    component={Credits}
                />
                <Route component={NotFound} />
                <Route component={NotFound} />
            </IonRouterOutlet>
        </IonReactRouter>
    )
}

export default Router
