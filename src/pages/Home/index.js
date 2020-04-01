import React, { useState, useRef } from 'react'
import styled from 'styled-components'
import {Link, Redirect, Route} from 'react-router-dom'
import { useTranslation, Trans } from 'react-i18next'

import ColumnsLayout from '../../layout/Columns'
import { createCall } from '../../actions/createCall'
import Form from '../../components/Form'
import Description from './Description'


const DataMentions = styled.div`
    .cnil {
        margin: ${({theme}) => theme.spacing.XS} 0;
        color: ${({theme}) => theme.color.white};
        font-size: ${({theme}) => theme.font.S};
    }
`

export default function Home(){
    const {t} = useTranslation(['home', 'common'])
    const [loading, setLoading] = useState(false)
    const [videoCallId, setVideoCallId] = useState()
    const [error, setError] = useState()
    const formSubmissionMessage = useRef(null)

    const submit = (values, setSubmitting) => {
        setLoading(true)
        createCall(values)
            .then(roomName => {
                setVideoCallId(roomName)
            })
            .catch(setError)
                window.scrollTo({
                    top: formSubmissionMessage.current.offsetTop,
                    behavior: 'smooth',
                })
            .finally(() => {
                setLoading(false)
                setSubmitting(false)
            })
    }
    return (
        <ColumnsLayout title={`${t('page-title')} - Instant Visio`}>
            <Description />
            <Form onSubmit={submit} isSending={loading} errorSending={error ? true : false} />
            <div ref={formSubmissionMessage}>
                {videoCallId &&
                    <Route  
                        render={() => {
                            window.location.pathname = `/${t('common:url.video-call')}/${videoCallId}`
                            return null
                        }} 
                    />
                }
            </div>
            <DataMentions>
                <p className="cnil">{t('information.data-mentions.mandatory')}</p>
                <p className="cnil">
                    <Trans i18nKey='home:information.data-mentions.management'>Le responsable de traitement, Stéphane Luçon, s'assure du traitement des données recueillies pour effectuer l'envoi du SMS ou de l'e-mail au correspondant. Suite à l'envoi, ces données sont effacées au bout d'un jour. Pour en savoir plus sur la gestion des données personnelles et pour exercer vos droits, veuillez vous reporter à la page <Link to="/donnees-personnelles">Données personnelles</Link>.</Trans>
                </p>
            </DataMentions>
        </ColumnsLayout>
    )
}