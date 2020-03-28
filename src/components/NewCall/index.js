import React, {useState, useRef} from 'react'
import {Route, Link} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import {Container} from 'react-bootstrap'

import {createCall} from '../../actions/createCall'

import './newcall.css'

import Header from '../Header'
import DefaultStyled from '../../styles/Default'
import Form from '../Form'
import Footer from '../Footer'

const NewCall = () => {
    const [loading, setLoading] = useState(false)
    const [videoCallId, setVideoCallId] = useState()
    const [error, setError] = useState()
    const formSubmissionMessage = useRef(null)

    const submit = (values) => {
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
            })
    }

    return (
        <>
            <Header />
            <DefaultStyled>
                <Container className="NewCall-desc">
                    <p className="default-smallTitle">Comment ça fonctionne ?</p>
                    <ol className="NewCall-desc-list">
                        <li className="NewCall-desc-list-element">
                            <span className="NewCall-desc-list-element-number NewCall-desc-list-element-content">1</span>
                            {<div className="NewCall-desc-list-element-period NewCall-desc-list-element-content">.</div>}
                            <p className="NewCall-desc-list-element-text">Remplissez le formulaire ci-dessous.</p>
                        </li>
                        <li className="NewCall-desc-list-element NewCall-desc-list-element-margin">
                            <span className="NewCall-desc-list-element-number NewCall-desc-list-element-content">2</span>
                            {<div className="NewCall-desc-list-element-period NewCall-desc-list-element-content">.</div>}
                            <p className="NewCall-desc-list-element-text">Validez en cliquant sur le bouton « Joindre mon proche ».</p>
                        </li>
                        <li className="NewCall-desc-list-element">
                            <span className="NewCall-desc-list-element-number NewCall-desc-list-element-content">3</span>
                            {<div className="NewCall-desc-list-element-period NewCall-desc-list-element-content">.</div>}
                            <p className="NewCall-desc-list-element-text">La vidéo s’ouvre, vous pouvez échanger avec votre proche.</p>
                        </li>
                    </ol>
                </Container>
                <div className="NewCall-body">
                    <Container>
                        <Form onSubmit={submit} isSending={loading}/>
                        <div ref={formSubmissionMessage}>
                            {videoCallId &&
                                <Route  
                                    render={() => {
                                        window.location.href = `https://instantvisio.daily.co/${videoCallId}`
                                        return null
                                    }} 
                                />
                            }
                            {error &&
                            <>
                                <p>{'Le sms ou l\'e-mail n\'a pas pu être envoyé. Veuillez vérifier les informations renseignées et soumettre à nouveau le formulaire.'}</p>
                                <p>Veuillez soumettre à nouveau le formulaire.</p>
                            </>
                            }
                        </div>
                        <p>Stéphane Luçon traite les données recueillies pour assurer l'envoi du SMS ou de l'e-mail au correspondant. Suite à l'envoi, ces données sont immédiatement effacées. Pour en savoir plus sur la gestion des données personnelles et pour exercer vos droits, reportez-vous à la page <Link to="/donnees-personnelles">Données personnelles</Link>.</p>
                    </Container>
                </div>
            </DefaultStyled>
            <div className="NewCall-footer">
                <Footer />
            </div>
        </>
    )
}

export default NewCall
