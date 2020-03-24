import React, { useEffect, useRef, useState } from 'react'
import DailyIframe from '@daily-co/daily-js'
import './style.css'
import LeaveModal from './LeaveModal'

const VideoCallFrame = ({ url }) => {

    const videoFrame = useRef(null)

    const hangUpConfirm = useRef(null)

    const [hangUp, setHangUp] = useState('')

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
                iframeStyle: {
                    position: 'fixed',
                    bottom: 0,
                    left: 0,
                    width: '100%',
                    height: '100%'
                },
                showLeaveButton: true
            }
        )
        daily.join({ url })

        window.addEventListener('beforeunload', leavingCallPage)
        // ComponentWillUnmount
        return () => {
            window.removeEventListener('beforeunload', leavingCallPage)
        }
       
    })
    
    return (
        <>
            <div ref={videoFrame}>  
            </div>
            <div ref={hangUpConfirm}>{hangUp}</div>    
        </>
    )
}

export default VideoCallFrame