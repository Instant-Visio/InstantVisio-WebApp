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
    const [ participantStatus, setParticipantStatus ] = useState('')
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

        let participants = daily.participants()

        const eventActions = (event) => {
            daily.localVideo() === true ? setCamOn(true) : setCamOn(false)
            daily.localAudio() === true ? setAudioOn(true) : setAudioOn(false)

            if (participants && Object.keys(participants).length < 2) {
                setParticipantStatus(t('waiting-participant'))
            } else if (participants && Object.keys(participants).length < 3) {
                if (event && event.participant.local === false && event.participant.video === false) {
                    setParticipantStatus(t('participant-cam-off'))
                } else if (event && event.participant.local === false && event.participant.video === true) {
                    setParticipantStatus('')
                }
            } else {
                setParticipantStatus('')
            }

            if (participants) {
                switch (Object.keys(participants).length) {
                case 3:
                    setParticipantNumber(3)
                    break
                case 4:
                    setParticipantNumber(4)
                    break
                default:
                    setParticipantNumber(1)
                }
            }
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

        daily.on('participant-updated', eventActions)

        daily.on('participant-left', (event) => { 

            if (event.participant.local === false && Object.keys(participants).length < 2) {
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
            <CallContainer>

                <IframeContainer>
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
                    {!camOn && !leftCallFrame && (<div className={classNames({'mute-camera': true, 'mute-camera-three': participantNumber === 3, 'mute-camera-four': participantNumber === 4 })} ref={turnCamOnMessage}>{t('turn-on-cam-message')}</div>)}
                    
                    {!leftCallFrame && <div className="waiting-participant">{participantStatus}</div>}
                    
                    {leftCallFrame && <div>{t('leave-confirmation')}</div>}
                </IframeContainer>

                {!leftCallFrame && <Controls>
                    <div className="cam-audio">
                        <div ref={cam} className={classNames({ 'control': true, 'black': camOn, 'red': !camOn })}>
                            <img src={camOn ? cameraOn : cameraOff} />
                            <p>{t('cam')}</p>
                        </div>
                        <div ref={audio} className={classNames({ 'control': true, 'black': audioOn, 'red': !audioOn })}>
                            <img src={audioOn ? micOn : micOff}/>
                            <p>{t('audio')}</p>
                        </div>
                    </div>
                    <div ref={leaving} className="control red leave">
                        <img src={leave}/>
                        <p>{t('leave')}</p>
                    </div>

                </Controls>}

            </CallContainer>

            {leftCallFrame && <Footer />}
        </>
    )
}

export default VideoCallFrame
