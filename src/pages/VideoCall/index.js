import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import {
    useParams
} from 'react-router-dom'
import DailyIframe from '@daily-co/daily-js'
import { useTranslation } from 'react-i18next'

import Header from '../../components/Header'
import Footer from '../../components/Footer'

const IframeStyled = styled.div`
    width: 100vw;
    height: 81vh;
    color: ${({theme}) => theme.color.white};
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: ${({theme}) => theme.font.L};
    iframe {
        width: 100%;
        height: 100%;
        border: none;   
    }
`
const LeaveButton = styled.div`
    width: 100vw;
    height: 7vh;
    display: flex;
    align-items: center;
    color: ${({theme}) => theme.color.white};
    font-weight: 600;
    background-color: ${({theme}) => theme.color.red};
    cursor: pointer;
    :hover {
        background-color: #9a2530;
    }
    p {
        margin: 0 auto;
    }
`

const VideoCallFrame = () => {
    const {t} = useTranslation('videocall')

    const [ leftCallFrame, setLeftCallFrame ] = useState(false)
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

    const leavingCallFrame = () => {
        setLeftCallFrame(true)
    }

    useEffect(() => {
        const daily = DailyIframe.wrap(videoFrame.current)

        daily.join({
            url,
            showFullscreenButton: true
        })

        if (leftCallFrame) {
            daily.leave()
        }

        window.addEventListener('beforeunload', leavingCallPage)
        // ComponentWillUnmount
        return () => {
            window.removeEventListener('beforeunload', leavingCallPage)
        }

    }, [url, leftCallFrame])


    return (
        <>

            {leftCallFrame && <Header />}
            <IframeStyled>
                {
                    !leftCallFrame && <iframe
                        title="video call iframe"
                        ref={videoFrame}
                        allow="microphone; camera; autoplay"
                    />
                }
                {
                    leftCallFrame && <div>{t('leave-confirmation')}</div>
                }
            </IframeStyled>
            {!leftCallFrame && <LeaveButton onClick={leavingCallFrame}>
                <p>{t('leave-feature')}</p>
            </LeaveButton>}
            <Footer />
        </>
    )
}

export default VideoCallFrame
