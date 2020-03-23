import React, { useRef, useEffect } from 'react'
import DailyIframe from '@daily-co/daily-js'

const VideoCallFrame = ({ url }) => {

    const videoFrame = useRef(null)

    useEffect(() => {
        const daily = DailyIframe.wrap(videoFrame.current)
        daily.join({ url })
    })

    return (
        <iframe
            className="video-frame"
            title="Fenêtre d'appel visio"
            ref={videoFrame}
            allow="camera; microphone; fullscreen"
        />
    )
}

export default VideoCallFrame