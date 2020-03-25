import React, {useState, useRef} from 'react'
import {Route} from 'react-router-dom'
import {createCall} from '../../actions/createCall'
import 'bootstrap/dist/css/bootstrap.min.css'
import {Container} from 'react-bootstrap'
import Form from '../Form/Form'
import InstantVisioLogo from '../../styles/assets/images/Favicon_InstantVisio_Titre.png'
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
                <h1>
                    <img
                        src={InstantVisioLogo}
                        alt="logo de Instant Visio, représentant un écran de téléphone portable bleu où apparaît un visage sous forme de cercle orange, discutant en visio avec le propriétaire du téléphone, dont le visage apparaît sous la forme d'un cercle aux contours oranges."
                        className="NewCall-logo"
                    />
                </h1>
                <Container>
                    <p className="NewCall-desc">{'À la soumission du formulaire ci-dessous, vous serez redirigé-e vers la page d\'appel en visiophone. En parallèle, un sms et / ou un e-mail sera envoyé à votre proche et l\'invitera à vous rejoindre directement sur la page pour échanger avec vous.'}</p>
                </Container>
            </header>
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
