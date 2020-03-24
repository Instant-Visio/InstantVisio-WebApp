import React, {useState} from 'react'
import {Redirect} from 'react-router-dom'
import { createCall } from '../../actions/createCall'
import 'bootstrap/dist/css/bootstrap.min.css'
import {Container} from 'react-bootstrap'
import Form from '../Form/Form'
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
                <h1>Instant Visio</h1>
                <Container>
                    <p className="App-desc">{'À la soumission du formulaire, vous serez redirigé-e vers la page d\'appel en visiophone. En parallèle, un e-mail sera envoyé à votre proche pour qu\'il ou elle vous rejoigne directement sur la page et échange avec vous.'}</p>
                </Container>
            </header>
            <div className="App-body">
                <Container>
                    <Form onSubmit={submit} isSending={loading}/>
                    <div className="form-submission-message">
                        {videoCallId &&
                            <Redirect to={`/${videoCallId}`} />
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
