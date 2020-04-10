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
    height: 100vh;
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
    background-color: #e8e8e8;
    color: #343434;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 21rem;
    height: 13rem;
    position: absolute;
    z-index: 10;
    bottom: 6rem;
    left: 1rem;
`
const Controls = styled.div`
    position: absolute;
    width: 100vw;
    height: 10vh;
    bottom: 0;
    background: white;
    color: black;
`

const VideoCallFrame = () => {
    const {t} = useTranslation('videocall')

    const [ leftCallFrame, setLeftCallFrame ] = useState(false)
    const [ camOn, setCamOn ] = useState(false)
    const [ ps, setPs ] = useState(null)
    let { videoName } = useParams()

    const url = `https://instantvisio.daily.co/${videoName}`

    const cam = useRef(null)
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
                width: 21rem;
                height: 13rem;
                position: absolute;
                z-index: 10;
                bottom: 6rem;
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

              .daily-video-div.local.cam-muted::before {
                font-family: 'Open Sans', sans-serif;
                content: attr(data-switch-cam);
                background: rgba(255, 255, 255, 0.3) !important;
                width: 100%;
                height: 100%;
                position: absolute;
                left: 0;
                top: 0;
                z-index: 1;
                display: flex;
                align-items: center;
                justify-content: center;
                color: #ffffff;
              }
              
              .show-names .daily-video-div::before {
                  content: attr(data-user-name);
                  position: absolute;
                  padding: 0.65em;
                  background-color: rgba(255, 255, 255, 0.9);
                  z-index: 1;
              }
              
              .info-div {
                  position: fixed;
                  width: 100%;
                  bottom: 0;
                  height: 1.5em;
                  text-align: center;
                  font-weight: bold;
                  color: white;
                  padding: 0.625em;
              }
              
              .info-div .screen
              
              .low-bandwidth .info-div {
                  background-color: grey;
              }
              .low-bandwidth .info-div::after {
                  content: "32kb/s upstream video bandwidth cap";
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

        cam.current.addEventListener('click', () => {
            daily.setLocalVideo(!daily.localVideo())
            if (daily.localVideo() == true) {
                
                cam.current.textContent = t('turn-on-cam')
            } else {
            
                cam.current.textContent = t('turn-off-cam')
            }
        })

        if (daily.localVideo() == true) {
            
            cam.current.textContent = t('turn-on-cam')
        } else {
        
            cam.current.textContent = t('turn-off-cam')
        }
            
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
                        className="iframe"
                        title="video call iframe"
                        ref={videoFrame}
                        allow="microphone; camera; autoplay"
                        allowFullScreen
                    />
                }
                {
                   
                
                }
                {
                    leftCallFrame && <div>{t('leave-confirmation')}</div>
                }
            </IframeStyled>
            <Controls>
                <div ref={cam} />

                <div>
                    Activer le micro
                </div>
            </Controls>
            {leftCallFrame && <Footer />}
        </>
    )
}

export default VideoCallFrame
