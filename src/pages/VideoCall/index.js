import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import DailyIframe from '@daily-co/daily-js'
import { useTranslation } from 'react-i18next'
import classNames from 'classnames'
import Icon from '@mdi/react'
import {
    mdiVideo,
    mdiVideoOff,
    mdiHelpCircle,
    mdiMicrophone,
    mdiMicrophoneOff,
    mdiExitToApp,
} from '@mdi/js'

import dailyCssText from './dailyCssText'
import { CallContainer, IframeContainer, Controls } from './VideoCall'
import Fullscreen from '../../components/Fullscreen'
import sendCallLogs from '../../actions/sendCallLogs'
import Footer from '../../components/Footer'
import {
    hideSupport,
    setVideoCallExited,
    toggleSupport,
} from '../../utils/support'
import CapabilitiesDialog from './permissions/CapabilitiesDialog'

const VideoCallFrame = () => {
    const { t } = useTranslation('videocall')

    const [camOn, setCamOn] = useState(true)
    const [audioOn, setAudioOn] = useState(true)
    const [participantStatus, setParticipantStatus] = useState('')
    const [participantNumber, setParticipantNumber] = useState(0)
    const [leftCallFrame, setLeftCallFrame] = useState(false)
    let { videoName } = useParams()

    const url = `https://instantvisio.daily.co/${videoName}`

    const videoFrame = useRef(null)
    const cam = useRef(null)
    const audio = useRef(null)
    const leaving = useRef(null)

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
            customLayout: true,
        })

        daily.join({
            url,
            cssText: dailyCssText,
        })
        hideSupport()

        const roomLogsToSend = (event) => {
            sendCallLogs(videoName, event)
        }

        const eventActions = (event) => {
            sendCallLogs(videoName, event)

            setCamOn(daily.localVideo())
            setAudioOn(daily.localAudio())

            const participantsLength = Object.keys(daily.participants()).length

            if (participantsLength === 2 && event && !event.participant.local) {
                setParticipantStatus(
                    !event.participant.video ? t('participant-cam-off') : ''
                )
            } else if (participantsLength > 2) {
                setParticipantStatus('')
            } else if (participantsLength < 2) {
                setParticipantStatus(t('waiting-participant'))
            }

            setParticipantNumber(participantsLength)
        }

        cam.current.addEventListener('click', () => {
            daily.setLocalVideo(!daily.localVideo())
        })

        audio.current.addEventListener('click', () => {
            daily.setLocalAudio(!daily.localAudio())
        })

        daily
            .on('loading', roomLogsToSend)
            .on('loaded', eventActions)
            .on('started-camera', roomLogsToSend)
            .on('camera-error', roomLogsToSend)
            .on('active-speaker-change', roomLogsToSend)
            .on('active-speaker-mode-change', roomLogsToSend)
            .on('error', roomLogsToSend)
            .on('joined-meeting', eventActions)
            .on('participant-joined', eventActions)
            .on('participant-updated', eventActions)
            .on('network-connection', roomLogsToSend)
            .on('network-quality-change', roomLogsToSend)
            .on('participant-left', (event) => {
                sendCallLogs(videoName, event)
                setParticipantStatus(
                    !event.participant.local &&
                        Object.keys(daily.participants()).length < 2
                        ? t('participant-left')
                        : ''
                )
            })
            .on('left-meeting', roomLogsToSend)

        leaving.current.addEventListener('click', () => {
            daily.leave()
            setVideoCallExited()
            setLeftCallFrame(true)
        })

        window.addEventListener('beforeunload', leavingCallPage)

        return () => {
            window.removeEventListener('beforeunload', leavingCallPage)
        }
    }, [url, t, videoName])

    return (
        <>
            <CallContainer>
                <Fullscreen />
                <IframeContainer>
                    {!leftCallFrame && (
                        <iframe
                            className="iframe"
                            title="video call iframe"
                            ref={videoFrame}
                            allow="microphone; camera; autoplay"
                            allowFullScreen
                        />
                    )}
                    {!camOn && !leftCallFrame && (
                        <div
                            className={classNames({
                                'mute-camera': true,
                                'mute-camera-two': participantNumber < 3,
                                'mute-camera-three': participantNumber === 3,
                                'mute-camera-four': participantNumber === 4,
                            })}>
                            {t('turn-on-cam-message')}
                        </div>
                    )}

                    {!leftCallFrame && (
                        <div className="waiting-participant">
                            {participantStatus}
                        </div>
                    )}

                    {leftCallFrame && <div>{t('leave-confirmation')}</div>}
                </IframeContainer>

                {!leftCallFrame && (
                    <Controls>
                        <div className="controlContainer">
                            <div
                                ref={cam}
                                className={classNames({
                                    control: true,
                                    green: camOn,
                                    red: !camOn,
                                })}>
                                {camOn ? (
                                    <Icon size={1} path={mdiVideo} />
                                ) : (
                                    <Icon size={1} path={mdiVideoOff} />
                                )}
                                <p>{t('cam')}</p>
                            </div>
                            <div
                                ref={audio}
                                className={classNames({
                                    control: true,
                                    green: audioOn,
                                    red: !audioOn,
                                })}>
                                {audioOn ? (
                                    <Icon size={1} path={mdiMicrophone} />
                                ) : (
                                    <Icon size={1} path={mdiMicrophoneOff} />
                                )}
                                <p>{t('audio')}</p>
                            </div>
                        </div>
                        <div className="controlContainer">
                            <div ref={leaving} className="control red leave">
                                <Icon size={1} path={mdiExitToApp} />
                                <p>{t('leave')}</p>
                            </div>
                            <div onClick={toggleSupport} className="control">
                                <Icon size={1} path={mdiHelpCircle} />
                                <p>{t('help')}</p>
                            </div>
                        </div>
                    </Controls>
                )}
            </CallContainer>

            <CapabilitiesDialog />

            {leftCallFrame && <Footer />}
        </>
    )
}

export default VideoCallFrame
