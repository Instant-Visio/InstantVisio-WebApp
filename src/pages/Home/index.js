import React, { useState, useRef } from 'react'
import {Link} from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import ColumnsLayout from '../../layout/Columns'
import { createCall } from '../../actions/createCall'
import Form from '../../components/Form'
import Description from './Description'
import { Route } from 'react-router-dom'


export default function Home(){
    const {t} = useTranslation('home')
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
            .finally(() => {
                window.scrollTo({
                    top: formSubmissionMessage.current.offsetTop,
                    behavior: 'smooth',
                })
                setLoading(false)
                setSubmitting(false)
            })
    }
    return (
        <ColumnsLayout title={`${t('page-title')} - Instant Visio`}>
            <Description />
            <>
                <Form onSubmit={submit} isSending={loading} errorSending={error} />
                <div ref={formSubmissionMessage}>
                    {videoCallId &&
                            <Route  
                                render={() => {
                                    window.location.href = `https://instantvisio.daily.co/${videoCallId}`
                                    return null
                                }} 
                            />
                    }
                </div>
                <p className="cnil">Les champs marqués d'une astérisque sont obligatoires.</p>
                <p className="cnil">Le responsable de traitement, Stéphane Luçon, s'assure du traitement des données recueillies pour effectuer l'envoi du SMS ou de l'e-mail au correspondant. Suite à l'envoi, ces données sont effacées au bout d'un jour. Pour en savoir plus sur la gestion des données personnelles et pour exercer vos droits, veuillez vous reporter à la page <Link to="/donnees-personnelles">Données personnelles</Link>.</p>
            </>
        </ColumnsLayout>
    )
}