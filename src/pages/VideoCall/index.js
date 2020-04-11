import React, { useEffect, useRef, useState } from 'react'
import {
    useParams
} from 'react-router-dom'
import DailyIframe from '@daily-co/daily-js'
import { useTranslation } from 'react-i18next'

import dailyCssText from './dailyCssText'
import { IframeStyled, MutedCamera, Controls } from './VideoCall'
import Footer from '../../components/Footer'


const VideoCallFrame = () => {
    const {t} = useTranslation('videocall')

    const [ leftCallFrame, setLeftCallFrame ] = useState(false)
    const [ camOn, setCamOn ] = useState(true)
    const [ audioOn, setAudioOn ] = useState(true)
    const [ participantStatus, setParticipantStatus ] = useState('')
    let { videoName } = useParams()

    const url = `https://instantvisio.daily.co/${videoName}`

    const cam = useRef(null)
    const audio = useRef(null)
    const videoFrame = useRef(null)
    const turnCamOnMessage = useRef(null)

    // to display confirmation message
    // when user attempts leaving page
    const leavingCallPage = (event) => {
        // Cancel the event as stated by the standard.
        event.preventDefault()
        // Chrome requires returnValue to be set.
        event.returnValue = ''
    }
        
    useEffect(() => {
        const daily = DailyIframe.wrap(videoFrame.current, { customLayout: true })

        daily.join({
            url,
            showLeaveButton: true,
            showFullscreenButton: true,
            cssText: dailyCssText
        })

        const eventActions = (event) => {
            console.log(event ? event : '')
            
            daily.localVideo() === true ? setCamOn(true) : setCamOn(false)
            daily.localAudio() === true ? setAudioOn(true) : setAudioOn(false)
            
            let participants = daily.participants()

            if (participants && Object.keys(participants).length < 2) {
                setParticipantStatus('Veuillez patientez, votre proche est sur le point de vous rejoindre.')
            } else if (event && event.participant.local === false && event.participant.video === false) {
                setParticipantStatus('Votre proche a rejoint l\'appel mais sa caméra n\'est pas active.')
            } else if (event && event.participant.local === false && event.participant.video === true) {
                setParticipantStatus('')
            }
        }

        cam.current.addEventListener('click', () => {
            daily.setLocalVideo(!daily.localVideo())
        })

        audio.current.addEventListener('click', () => {
            daily.setLocalAudio(!daily.localAudio())
        })

        eventActions()

        daily.on('joined-meeting', eventActions)

        daily.on('participant-updated', eventActions)

        daily.on('participant-left', (event) => { 

            if (event.participant.local === false) {
                setParticipantStatus('Votre proche a quitté l\'appel.')
            } else {
                setParticipantStatus('')
            }
        })
            
        daily.on('left-meeting', () => {
            setLeftCallFrame(true)
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
            <IframeStyled>
                {
                    !leftCallFrame && <iframe
                        data-cam="Veuillez activer votre caméra"
                        className="iframe"
                        title="video call iframe"
                        ref={videoFrame}
                        allow="microphone; camera; autoplay"
                        allowFullScreen
                    />
                }
                {!camOn && <MutedCamera ref={turnCamOnMessage}>{t('turn-on-cam-message')}</MutedCamera>}
                {!leftCallFrame && <div className="waiting-participant">{participantStatus}</div>}
                {leftCallFrame && <div>{t('leave-confirmation')}</div>}
            </IframeStyled>
            <Controls>
                <div ref={cam} className={camOn ? 'control' : 'control red'}>{camOn ? t('turn-off-cam') : t('turn-on-cam')}</div>
                <div ref={audio} className={audioOn ? 'control' : 'control red'}>{audioOn ? t('turn-off-audio') : t('turn-on-audio')}</div>
            </Controls>
            {leftCallFrame && <Footer />}
        </>
    )
}

export default VideoCallFrame
