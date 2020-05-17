import React, { useState, useRef, useContext } from 'react'
import styled from 'styled-components'
import { Link, Route } from 'react-router-dom'
import { useTranslation, Trans } from 'react-i18next'
import { Context } from '../../utils/global/context'
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
import { Navbar } from 'react-bootstrap'

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
    const [loading, setLoading] = useState(false)
    const [videoCallId, setVideoCallId] = useState()
    const [error, setError] = useState()
    const formSubmissionMessage = useRef(null)

    const { store } = useContext(Context)
    const [modalShow, setModalShow] = React.useState(false)

    const submit = (values, setSubmitting) => {
        setLoading(true)
        setNewCall(values)
        createCall(values)
            .then((roomName) => {
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
            .finally(() => {
                setLoading(false)
            })
    }
    return (
        <div>
            {!store.isMobile ? (
                <ColumnsLayout title="Instant Visio">
                    <Description />
                    <Form onSubmit={submit} isSending={loading} error={error} />
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
                <WrapperMobile>
                    <Navbar bg="dark" variant="dark">
                        <Navbar.Brand href="#home">
                            <img
                                alt=""
                                src="/logo.svg"
                                width="30"
                                height="30"
                                className="d-inline-block align-top"
                            />{' '}
                            React Bootstrap
                        </Navbar.Brand>
                    </Navbar>
                    <MobileContent>
                        <LogoContainer>
                            <Logo />
                        </LogoContainer>
                        <DescriptionMobile>
                            À la soumission du formulaire, vous serez redirigé-e
                            vers la apge d'appel en visiophone. En parallèle, un
                            sms et / ou un e-mail sera envoyé à votre proche et
                            l'invitera à vous rejoindre directement sur la page
                            pour échanger avec vous.
                        </DescriptionMobile>
                        <FormMobile
                            onSubmit={submit}
                            isSending={loading}
                            error={error}
                        />
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
                            En savoir plus
                        </KnowMoreMobile>
                        <MyVerticallyCenteredModal
                            show={modalShow}
                            onHide={() =>
                                setModalShow(false)
                            }></MyVerticallyCenteredModal>
                    </MobileContent>
                </WrapperMobile>
            )}
        </div>
    )
}
