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
    JoinVideoCall,
} from '../../pages'

import VideoCallPrecheck from '../../pages/VideoCall/VideoCallPrecheck'
import { useTranslation } from 'react-i18next'
import { Route } from 'react-router-dom'
import { IonRouterOutlet } from '@ionic/react'

const Router = () => {
    const { t } = useTranslation()

    return (
        <IonRouterOutlet>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route
                    path={`/${t('url.video-call')}/:videoName`}
                    component={VideoCallPrecheck}
                />
                <Route
                    path={`/${t('url.video-call')}`}
                    component={JoinVideoCall}
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
            </Switch>
        </IonRouterOutlet>
    )
}

export default Router
