import React, {useState} from 'react'
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

    const submit = (values) => {
        setLoading(true)
        createCall(values)
            .then(roomName => {
                setVideoCallId(roomName)
            })
            .catch(setError)
            .finally(() => {
                setLoading(false)
            })
    }

    return (
        <div className="App">
            <header className="App-header">
                <h1>
                    <img
                        src={InstantVisioLogo}
                        alt="logo de Instant Visio, représentant un écran de téléphone portable bleu où apparaît un visage sous forme de cercle orange, discutant en visio avec le propriétaire du téléphone, dont le visage apparaît sous la forme d'un cercle aux contours oranges."
                        className="App-logo"
                    />
                </h1>
                <Container>
                    <p className="App-desc">{'À la soumission du formulaire ci-dessous, vous serez redirigé-e vers la page d\'appel en visiophone. En parallèle, un sms et / ou un e-mail sera envoyé à votre proche et l\'invitera à vous rejoindre directement sur la page pour échanger avec vous.'}</p>
                </Container>
            </header>
            <div className="App-body">
                <Container>
                    <Form onSubmit={submit} isSending={loading}/>
                    <div className="form-submission-message">
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
                            <p>{'Le message n\'a pas pu être envoyé. Si vous avez renseigné un numéro de téléphone, vous pouvez envoyer un message uniquement si votre appareil est équipé d\'une carte SIM.'}</p>
                            <p>Veuillez soumettre à nouveau le formulaire.</p>
                        </>
                        }
                    </div>
                </Container>
            </div>
        </div>
    )
}

export default NewCall
