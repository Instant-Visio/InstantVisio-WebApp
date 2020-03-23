import React, {useEffect, useState} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import {Container} from 'react-bootstrap'
import Form from './components/Form'
import {
    functions,
} from './firebase/firebase'

import './App.css'
import {Route} from 'react-router-dom'

const App = () => {
    useEffect(() => {
        // when using vh and vw units in css:
        // to make sure the height taken into account
        // is the whole window size,
        // not the visible window size
        // (critical on mobile, where, on click on the contact form inputs,
        // the keyboard appears and takes half of the window size,
        // which shrinks the form size - unpleasant user experience)
        setTimeout(() => {
            const viewheight = window.innerHeight
            const viewwidth = window.innerWidth
            const viewport = document.querySelector('meta[name=viewport]')
            viewport.setAttribute('content', `height=${viewheight}px, width=${viewwidth}px, initial-scale=1.0`)
        }, 300)
    }, [])

    const [submission, setSubmission] = useState({
        success: false,
        fail: false,
    })

    const [loading, setLoading] = useState(false)

    const [visioURL, setVisioURL] = useState(null)

    const handleSubmit = async (values) => {
        setLoading(true)

        window.scrollTo({
            top: document.querySelector('body').scrollHeight - document.querySelector('body').clientHeight,
            behavior: 'smooth',
        })

        try {
            const result = await functions.newCall({
                name: values.personName,
                phone: values.phone,
                email: values.mail
            }).catch((error) => {
                console.error(error)
                setSubmission({
                    ...submission,
                    success: false,
                    fail: true
                })
                throw new Error('Failed to trigger the call')
            })

            if(!result || !result.data || !result.data.roomUrl) {
                throw new Error('Room url was not received')
            }

            setVisioURL(result.data.roomUrl)

            setSubmission({
                ...submission,
                success: true,
                fail: false
            })
        } catch (e) {
            console.error(e)
            setSubmission({
                ...submission,
                success: false,
                fail: true
            })
        } finally {
            setLoading(false)
        }
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
                    <Form onSubmit={handleSubmit} isSending={loading}/>
                    <div className="form-submission-message">
                        {submission.success &&
                        <Route
                            render={() => {
                                window.location.href = visioURL
                                return null
                            }}
                        />
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

export default App
