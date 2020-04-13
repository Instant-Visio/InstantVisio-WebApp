import React, { useEffect, useRef, useState } from 'react'
import {
    useParams
} from 'react-router-dom'
import DailyIframe from '@daily-co/daily-js'
import { useTranslation } from 'react-i18next'
import classNames from 'classnames'

import dailyCssText from './dailyCssText'
import { CallContainer, IframeContainer, Controls } from './VideoCall'
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
    const [ participantStatus, setParticipantStatus ] = useState(t('waiting-participant'))
    const [ participantNumber, setParticipantNumber ] = useState(0)
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
            cssText: dailyCssText
        })

        const eventActions = (event) => {
            setCamOn(daily.localVideo())
            setAudioOn(daily.localAudio())
            
            const participantsLength = Object.keys(daily.participants()).length

            if (participantsLength === 2 && (event && !event.participant.local)) {
                setParticipantStatus(!event.participant.video ? t('participant-cam-off') : '')
            } else if (participantsLength > 2) {
                setParticipantStatus('')
            }

            setParticipantNumber(participantsLength)
            
        }

        cam.current.addEventListener('click', () => {
            daily.setLocalVideo(!daily.localVideo())
        })

        audio.current.addEventListener('click', () => {
            daily.setLocalAudio(!daily.localAudio())
        })
        
        // to make cam and audio controls appear as soon as user arrives on page
        eventActions()

        daily.on('joined-meeting', eventActions)
            .on('participant-updated', eventActions)
            .on('participant-left', (event) => { 
                setParticipantStatus(!event.participant.local && Object.keys(daily.participants()).length < 2 ? t('participant-left') : '')
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

    }, [url, t])


    return (
        <>
            <CallContainer>

                <IframeContainer>
                    {
                        !leftCallFrame && <iframe
                            className="iframe"
                            title="video call iframe"
                            ref={videoFrame}
                            allow="microphone; camera; autoplay"
                            allowFullScreen
                        />
                    }
                    {!camOn && !leftCallFrame && (<div className={classNames({'mute-camera': true, 'mute-camera-two': participantNumber < 3, 'mute-camera-three': participantNumber === 3, 'mute-camera-four': participantNumber === 4 })} ref={turnCamOnMessage}>{t('turn-on-cam-message')}</div>)}
                    
                    {!leftCallFrame && <div className="waiting-participant">{participantStatus}</div>}
                    
                    {leftCallFrame && <div>{t('leave-confirmation')}</div>}
                </IframeContainer>

                {!leftCallFrame && <Controls>
                    <div className="cam-audio">
                        <div ref={cam} className={classNames({ 'control': true, 'black': camOn, 'red': !camOn })}>
                            <img src={camOn ? cameraOn : cameraOff} alt="" />
                            <p>{t('cam')}</p>
                        </div>
                        <div ref={audio} className={classNames({ 'control': true, 'black': audioOn, 'red': !audioOn })}>
                            <img src={audioOn ? micOn : micOff} alt="" />
                            <p>{t('audio')}</p>
                        </div>
                    </div>
                    <div ref={leaving} className="control red leave">
                        <img src={leave} alt="" />
                        <p>{t('leave')}</p>
                    </div>

                </Controls>}

            </CallContainer>

            {leftCallFrame && <Footer />}
        </>
    )
}

export default VideoCallFrame
