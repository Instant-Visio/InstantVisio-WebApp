import React, {useState, useRef} from 'react'
import {Route} from 'react-router-dom'
import {createCall} from '../../actions/createCall'
import 'bootstrap/dist/css/bootstrap.min.css'
import {Container} from 'react-bootstrap'
import Form from '../Form/Form'
import InstantVisioLogo from '../../styles/assets/images/Favicon_InstantVisio_Titre.png'
import InstantVisioLogoMobile from '../../styles/assets/images/Favicon_InstantVisio_Titre_mobile.png'
import './NewCall.css'

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
            <header className="NewCall-header">
                <Container className="NewCall-header-content">
                    <img
                        src={InstantVisioLogo}
                        alt="logo de Instant Visio, représentant un écran de téléphone portable bleu où apparaît un visage sous forme de cercle orange, discutant en visio avec le propriétaire du téléphone, dont le visage apparaît sous la forme d'un cercle aux contours oranges."
                        className="NewCall-logo"
                    />
                    <img
                        src={InstantVisioLogoMobile}
                        alt="logo de Instant Visio, représentant un écran de téléphone portable bleu où apparaît un visage sous forme de cercle orange, discutant en visio avec le propriétaire du téléphone, dont le visage apparaît sous la forme d'un cercle aux contours oranges."
                        className="NewCall-logo-mobile"
                    />
                    <Container className="NewCall-baseline">
                        <p className="NewCall-baseline-content">Joignez un proche en visio, en un clic, gratuitement.</p>
                    </Container>
                </Container>
            </header>
            <Container className="NewCall-desc">
                <p className="NewCall-desc-title">Comment ça fonctionne ?</p>
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
                </Container>
            </div>
        </>
    )
}

export default NewCall
