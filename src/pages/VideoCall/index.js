import React, { useEffect, useRef, useState } from 'react'
import {
    useParams
} from 'react-router-dom'
import DailyIframe from '@daily-co/daily-js'
import { useTranslation } from 'react-i18next'

import dailyCssText from './dailyCssText'
import { IframeStyled, MutedCamera, Controls } from './VideoCall'
import cameraOn from '../../styles/assets/images/camOn.svg'
import cameraOff from '../../styles/assets/images/camOff.svg'
import micOn from '../../styles/assets/images/audioOn.svg'
import micOff from '../../styles/assets/images/audioOff.svg'
import leave from '../../styles/assets/images/leave.svg'
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
    const leaving = useRef(null)
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
                setParticipantStatus(t('waiting-participant'))
            } else if (event && event.participant.local === false && event.participant.video === false) {
                setParticipantStatus(t('participant-cam-off'))
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
                setParticipantStatus(t('participant-left'))
            } else {
                setParticipantStatus('')
            }
        })

        leaving.current.addEventListener('click', () => {
            daily.leave()
            setLeftCallFrame(true)
        })

        window.addEventListener('beforeunload', leavingCallPage)
        // ComponentWillUnmount
        return () => {
            window.removeEventListener('beforeunload', leavingCallPage)
        }

    }, [url])


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
                {!camOn && !leftCallFrame && (<MutedCamera ref={turnCamOnMessage}>{t('turn-on-cam-message')}</MutedCamera>)}
                {!leftCallFrame && <div className="waiting-participant">{participantStatus}</div>}
                {leftCallFrame && <div>{t('leave-confirmation')}</div>}
            </IframeStyled>
            {!leftCallFrame && <Controls>
                <div className="cam-audio">
                    <div ref={cam} className={camOn ? 'control black' : 'control red'}>
                        <img src={camOn ? cameraOn : cameraOff} />
                        <p>{t('cam')}</p>
                    </div>
                    <div ref={audio} className={audioOn ? 'control black' : 'control red'}>
                        <img src={audioOn ? micOn : micOff}/>
                        <p>{t('audio')}</p>
                    </div>
                </div>
                <div ref={leaving} className="control red leave">
                    <img src={leave}/>
                    <p>{t('leave')}</p>
                </div>
            </Controls>}
            {leftCallFrame && <Footer />}
        </>
    )
}

export default VideoCallFrame
