import React, { useEffect, useRef } from 'react'
import DailyIframe from '@daily-co/daily-js'
import './style.css'

const VideoCallFrame = ({ url }) => {

    const videoFrame = useRef(null)

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
                lang: 'fr'
            }
        )
        daily.join({ url })
    }, [])

    return (
        <div ref={videoFrame} />
    )
}

export default VideoCallFrame