import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import {
    useParams
} from 'react-router-dom'
import DailyIframe from '@daily-co/daily-js'

import Footer from '../../components/Footer'

const IframeStyled = styled.div`
    width: 100vw;
    height: 89vh;
    iframe {
        width: 100%;
        height: 100%;   
    }
`

const VideoCallFrame = () => {
    let { videoName } = useParams()

    const url = `https://instantvisio.daily.co/${videoName}`

    const videoFrame = useRef(null)

    // to display confirmation message 
    // when user attempts leaving page
    const leavingCallPage = (event) => {
        // Cancel the event as stated by the standard.
        event.preventDefault()
        // Chrome requires returnValue to be set.
        event.returnValue = ''
    }

    useEffect(() => {
        const daily = DailyIframe.wrap(videoFrame.current, {
            showLeaveButton: true
        })
        daily.join({ url })

        window.addEventListener('beforeunload', leavingCallPage)
        // ComponentWillUnmount
        return () => {
            window.removeEventListener('beforeunload', leavingCallPage)
        }
       
    }, [])

    
    return (
        <>
            <IframeStyled>
                <iframe
                    title="video call iframe"
                    ref={videoFrame}
                    allow="camera; microphone; fullscreen"
                />
            </IframeStyled>
            <Footer />
        </>
    )
}

export default VideoCallFrame