import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import {
    useParams
} from 'react-router-dom'
import DailyIframe from '@daily-co/daily-js'
import { useTranslation } from 'react-i18next'

import {SCREEN} from '../../styles/theme'
import Footer from '../../components/Footer'

const IframeStyled = styled.div`
    width: 100vw;
    height: 90vh;
    position: relative;
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

    .waiting-participant {
        position: absolute;
        text-align: center;
    }

    /* ${SCREEN.MOBILE} and (orientation: portrait) {
        .landscape {
          transform: rotate(-90deg);
          transform-origin: left top;
          width: 100vh;
          height: 100vw;
          overflow-x: hidden;
          position: absolute;
          top: 100%;
          left: 0;
        }
      } */
`

const MutedCamera = styled.div`
    background: radial-gradient(21rem circle, #988673,#473D38);
    /* OR: background: radial-gradient(19rem circle,#c7a886,#060505); */
    border-radius: ${({theme}) => theme.spacing.XS};
    display: flex;
    justify-content: center;
    align-items: center;
    width: 21rem;
    height: 13rem;
    position: absolute;
    z-index: 10;
    bottom: 2rem;
    left: 1rem;
`
const Controls = styled.div`
    position: absolute;
    width: 100vw;
    height: 10vh;
    bottom: 0;
    background: white;
    color: black;

    .control {
        cursor: pointer;
        with: fit-content;
    }

    .red {
        color: ${({theme}) => theme.color.red};
    }
`

const VideoCallFrame = () => {
    const {t} = useTranslation('videocall')

    const [ leftCallFrame, setLeftCallFrame ] = useState(false)
    const [ camOn, setCamOn ] = useState(true)
    const [ participantStatus, setParticipantStatus ] = useState('')
    const [ ps, setPs ] = useState(null)
    let { videoName } = useParams()

    const url = `https://instantvisio.daily.co/${videoName}`

    const cam = useRef(null)
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
            cssText: `
            .daily-video-toplevel-div {
                    position: relative;
              }
              
              .scroll::-webkit-scrollbar {
                    display: none;
              }
              
              .daily-video-element {
                    object-fit: cover;
              }
              
              .daily-videos-wrapper {
                    position: relative;
                    display: flex;
                    flex-direction: column;
                    overflow-x: auto;
                    -ms-overflow-style: -ms-autohiding-scrollbar;
              }
              
              .daily-video-div {
                    position: relative;
                    visibility: visible;
                    overflow: hidden;
              }
              
              /** Alone in call **/
              .daily-video-div.local, .daily-video-div.screen {
                    border-radius: 0.5rem;
                    width: 21rem;
                    height: 13rem;
                    position: absolute;
                    z-index: 10;
                    bottom: 2rem;
                    left: 1rem;
              }
              
              /** 2-person call **/
              .daily-videos-wrapper.remote-cams-1 > .daily-video-div.remote {
                    height: 100%;
              }
              
              /** 3-person call**/
              .daily-videos-wrapper.remote-cams-2 > .daily-video-div.remote:nth-child(2) {
              }
              
              .daily-videos-wrapper.remote-cams-2 > .daily-video-div.remote:nth-child(3) {
              }
              
              /** 4-person call**/
              .daily-videos-wrapper.remote-cams-3 > .daily-video-div.remote:nth-child(2) {
              }
              
              .daily-videos-wrapper.remote-cams-3 > .daily-video-div.remote:nth-child(3) {
              }
              
              .daily-videos-wrapper.remote-cams-3 > .daily-video-div.remote:nth-child(4) {
              }

              .daily-video-div.remote.cam-muted::before {
                    content: '';
                    background: linear-gradient(to bottom, #404E5D 0%, #606465 32%, #584f45 73%, #121211 101%, #816c54 100%), radial-gradient(ellipse at center, #494f2f 0%, #606465 22%, #d6cabc 62%, #44444C 100%, #6E6A6B 100%) !important;
                    width: 100%;
                    height: 100%;
                    position: absolute;
                    left: 0;
                    top: 0;
                    z-index: 1;
                    display: flex;
                    align-items: center;
                    justify-content: center;
              }
              
              @media (max-width: 800px) {
                    .daily-videos-wrapper {
                      
                  }
              
                  /** 2-person call **/
                  .daily-videos-wrapper.remote-cams-1 > .daily-video-div.remote {
                  }
              
                  /** 3-person call**/
                  .daily-videos-wrapper.remote-cams-2 > .daily-video-div.remote:nth-child(2) {
                  }
              
                  .daily-videos-wrapper.remote-cams-2 > .daily-video-div.remote:nth-child(3) {
                  }
              
                  /** 4-person call**/
                  .daily-videos-wrapper.remote-cams-3 > .daily-video-div.remote:nth-child(2) {
                  }
              
                  .daily-videos-wrapper.remote-cams-3 > .daily-video-div.remote:nth-child(3) {
                  }
              
                  .daily-videos-wrapper.remote-cams-3 > .daily-video-div.remote:nth-child(4) {
                  }
              }
            `
        })

        daily.on('joined-meeting', (event) => {
            console.log('joined-meeting')
            console.log(event)
        })
        
        cam.current.addEventListener('click', () => {
            daily.setLocalVideo(!daily.localVideo())
        })

        daily.on('participant-updated', (event) => {
            console.log(event)
            if (daily.localVideo() === true) {
                cam.current.textContent = t('turn-off-cam')
                cam.current.classList.add('red')
                turnCamOnMessage.current.style.display = 'none'
            } else {
                cam.current.textContent = t('turn-on-cam')
                cam.current.classList.remove('red')
                turnCamOnMessage.current.style.display = 'flex'
            }

            if (event.participant.local === false && event.participant.video === false) {
                setParticipantStatus('Votre proche a rejoint l\'appel mais sa caméra n\'est pas active.')
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

    }, [url, camOn, leftCallFrame])


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
                {
                    <MutedCamera ref={turnCamOnMessage}>{t('turn-on-cam-message')}</MutedCamera>
                }
                {
                    !leftCallFrame && <div className="waiting-participant">{participantStatus}</div>
                }
                {
                    leftCallFrame && <div>{t('leave-confirmation')}</div>
                }
            </IframeStyled>
            <Controls>
                <div ref={cam} className="control" />
                <div className="control">
                    Activer le micro
                </div>
            </Controls>
            {leftCallFrame && <Footer />}
        </>
    )
}

export default VideoCallFrame
