import React, { useState, useRef, useContext } from 'react'
import styled from 'styled-components'
import { Link, Route } from 'react-router-dom'
import { useTranslation, Trans } from 'react-i18next'
import ColumnsLayout from '../../layout/Columns'
import { createCall } from '../../actions/createCall'
import FormMobile from '../../components/FormMobile'
import Form from '../../components/Form'
import MyVerticallyCenteredModal from '../../components/VerticallyCenteredModal'
import Description from './Description'
import {
    setNewCall,
    setNewCallError,
    setNewCallRedirected,
} from '../../utils/support'
import Logo from '../../components/Logo'
import useDetectMobileOrTablet from '../../hooks/useDetectMobileOrTablet'
import { IonContent } from '@ionic/react'
import * as LocalStorage from '../../services/local-storage'

const DataMentions = styled.div`
    .cnil {
        margin: ${({ theme }) => theme.spacing.XS} 0;
        color: ${({ theme }) => theme.color.white};
        font-size: ${({ theme }) => theme.font.S};
    }
`

const LogoContainer = styled.div`
    padding-left: 25%;
    padding-right: 25%;
`

const DescriptionMobile = styled.p`
    text-align: center;
    margin: 10px;
    font-size: ${({ theme }) => theme.font.S};
`

const WrapperMobile = styled.div``

const MobileContent = styled.div`
    padding-left: 5%;
    padding-right: 5%;
    color: ${({ theme }) => theme.color.white};
`

const KnowMoreMobile = styled.p`
    text-align: center;
`

export default function Home() {
    const { t } = useTranslation(['home', 'common'])
    const [videoCallId, setVideoCallId] = useState()
    const [error, setError] = useState()
    const isMobile = useDetectMobileOrTablet()
    const formSubmissionMessage = useRef(null)
    const [modalShow, setModalShow] = React.useState(false)

    const { store, dispatch } = useContext(Context)

    const submit = (values, setSubmitting) => {
        setNewCall(values)
        createCall(values)
            .then((roomName) => {
                LocalStorage.setLastVideoCallId(roomName)
                setVideoCallId(roomName)
            })
            .catch((error) => {
                setError(error)
                setNewCallError(error)
                setSubmitting(false)
                window.scrollTo({
                    top: formSubmissionMessage.current.offsetTop,
                    behavior: 'smooth',
                })
            })
    }

    return (
        <IonContent>
            {!isMobile ? (
                <ColumnsLayout title="Instant Visio">
                    <Description />
                    <Form onSubmit={submit} error={error} />
                    <div ref={formSubmissionMessage}>
                        {videoCallId && (
                            <Route
                                render={() => {
                                    setNewCallRedirected()
                                    window.location.pathname = `/${t(
                                        'common:url.video-call'
                                    )}/${videoCallId}`
                                    return null
                                }}
                            />
                        )}
                    </div>
                    <DataMentions>
                        <p className="cnil">
                            {t('information.data-mentions.mandatory')}
                        </p>
                        <p className="cnil">
                            {/* prettier-ignore */}
                            <Trans i18nKey="home:information.data-mentions.management">
                        Le responsable de traitement, Stéphane Luçon, s'assure
                        du traitement des données recueillies pour effectuer
                        l'envoi du SMS ou de l'e-mail au correspondant. Suite à
                        l'envoi, ces données sont effacées au bout d'un jour.
                        Pour en savoir plus sur la gestion des données
                        personnelles et pour exercer vos droits, veuillez vous
                        reporter à la page <Link to="/donnees-personnelles">Données personnelles </Link>.
                    </Trans>
                        </p>
                        <p className="cnil">
                            {t('information.indications.multiple-people')}
                        </p>
                    </DataMentions>
                </ColumnsLayout>
            ) : (
                <WrapperMobile key={'anchor-left'}>
                    <MobileContent>
                        <LogoContainer>
                            <Logo />
                        </LogoContainer>
                        <DescriptionMobile>
                            {t('information.form-submit')}
                        </DescriptionMobile>
                        <FormMobile onSubmit={submit} error={error} />
                        <div ref={formSubmissionMessage}>
                            {videoCallId && (
                                <Route
                                    render={() => {
                                        setNewCallRedirected()
                                        window.location.pathname = `/${t(
                                            'common:url.video-call'
                                        )}/${videoCallId}`
                                        return null
                                    }}
                                />
                            )}
                        </div>
                        <KnowMoreMobile onClick={() => setModalShow(true)}>
                            {t('information.know-more')}
                        </KnowMoreMobile>
                        <MyVerticallyCenteredModal
                            show={modalShow}
                            onHide={() =>
                                setModalShow(false)
                            }></MyVerticallyCenteredModal>
                    </MobileContent>
                </WrapperMobile>
            )}
        </IonContent>
    )
}
