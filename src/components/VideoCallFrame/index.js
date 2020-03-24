import React, { useEffect, useRef, useState } from 'react'
import DailyIframe from '@daily-co/daily-js'
import './style.css'
import LeaveModal from './LeaveModal'

const VideoCallFrame = ({ url }) => {

    const videoFrame = useRef(null)

    // to display confirmation message 
    // when user attempts leaving page
    const leavingCall = (event) => {
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
                lang: 'fr',
                showLeaveButton: true
            }
        )
        daily.join({ url })

        window.addEventListener('beforeunload', leavingCall)
        // ComponentWillUnmount
        return () => {
            window.removeEventListener('beforeunload', leavingCall)
        }
       
    }, [])

    return (
        <>
            <div ref={videoFrame} />
        </>
    )
}

export default VideoCallFrame