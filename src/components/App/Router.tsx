import { Switch } from 'react-router-dom'
import React, { lazy } from 'react'
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

import AdminDashboardPage from '../../pages/AdminDashboard/AdminDashboard'
import { PremiumVideoPage } from '../../pages/PremiumVideoCall'
import VideoCallPrecheck from '../../pages/VideoCall/VideoCallPrecheck'
import { useTranslation } from 'react-i18next'
import { Route } from 'react-router-dom'
import { IonRouterOutlet } from '@ionic/react'
import License from '../../pages/License/License'
import WelcomeCall from '../../pages/WelcomeCall/WelcomeCall'
import PermissionVideoAudio from '../../pages/PermissionVideoAudio/PermissionVideoAudio'
import CallNotLaunched from '../../pages/WelcomeCall/CallNotLaunched'
import ProtectedRoute from './ProtectedRoute'
import { selectUser } from './userSelector'
import { useSelector } from 'react-redux'
import { IonContent } from '@ionic/react'
import AcceptCookies from '../../pages/AcceptCookies/AcceptCookies'

const Dashboard = lazy(() => import('../../pages/Admin/Dashboard'))

const Router = () => {
    const { t } = useTranslation()
    const { isAnonymous } = useSelector(selectUser)

    return (
        <IonRouterOutlet>
            <IonContent>
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
                    <Route
                        path={`/${t('url.license')}`}
                        exact
                        component={License}
                    />
                    <Route
                        path={`/premium-video`}
                        component={PremiumVideoPage}
                    />
                    <Route path={`/welcome`} component={WelcomeCall} />
                    <Route path={'/accept-cookies'} component={AcceptCookies} />
                    <Route
                        path={'/permissions-audio-video'}
                        component={PermissionVideoAudio}
                    />

                    <Route
                        path={`/premium-video`}
                        component={PremiumVideoPage}
                    />
                    <Route path={`/welcome`} component={WelcomeCall} />
                    <Route
                        path={'/call-not-launched'}
                        component={CallNotLaunched}
                    />

                    <ProtectedRoute
                        path="/admin"
                        isAuthorized={!isAnonymous}
                        component={AdminDashboardPage}
                    />
                    <Route component={NotFound} />
                </Switch>
            </IonContent>
        </IonRouterOutlet>
    )
}

export default Router
