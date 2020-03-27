import React, { useState, useRef } from 'react'
import ColumnsLayout from '../../layout/Columns'
import { createCall } from '../../actions/createCall'
import Form from '../../components/Form'
import Description from './Description'
import { Route } from 'react-router-dom'


export default function Home(){
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
        <ColumnsLayout>
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
            </>
        </ColumnsLayout>
    )
}