import React, {useEffect, useState} from 'react'
import {Redirect} from 'react-router-dom'
import handleSubmit from '../../lib/handleSubmit'
import 'bootstrap/dist/css/bootstrap.min.css'
import {Container} from 'react-bootstrap'
import Form from '../Form'
import './NewCall.css'

const NewCall = () => {

    const [submission, setSubmission] = useState({
        success: false,
        fail: false,
    })

    const [loading, setLoading] = useState(false)

    const [videoCallId, setVideoCallId] = useState()

    const submit = (values) => {
        handleSubmit(
            setLoading,
            values,
            setSubmission,
            submission,
            setVideoCallId
        )
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
                        {submission.success &&
                            <Redirect to={`/${videoCallId}`} />
                        }
                        {submission.fail &&
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
