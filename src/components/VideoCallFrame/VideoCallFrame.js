import React, { useEffect, useRef } from 'react'
import DailyIframe from '@daily-co/daily-js'
import './style.css'


const VideoCallFrame = ({ url }) => {

    const videoFrame = useRef(null)
    const leavingMessage = useRef(null)

    // to display confirmation message 
    // when user attempts leaving page
    const leavingCallPage = (event) => {
        // Cancel the event as stated by the standard.
        event.preventDefault()
        // Chrome requires returnValue to be set.
        event.returnValue = ''
    }

    useEffect(() => {
        const daily = DailyIframe.createFrame(
            videoFrame.current,
            {
                showLeaveButton: true,
                iframeStyle: {
                    position: 'fixed',
                    bottom: 0,
                    left: 0,
                    width: '100%',
                    height: '100%'
                }
            }
        )
        daily.join({ url })

        setTimeout(() => {
            leavingMessage.current.innerHTML = 'Vous pouvez fermer cette page.'
        }, 10000)

        window.addEventListener('beforeunload', leavingCallPage)
        // ComponentWillUnmount
        return () => {
            window.removeEventListener('beforeunload', leavingCallPage)
        }
       
    }, [])

    
    return (
        <>
            <div ref={videoFrame}>
                <div ref={leavingMessage} className="visio-message-container"></div>
            </div>  
        </>
    )
}

export default VideoCallFrame