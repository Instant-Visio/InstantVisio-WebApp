import React, { useEffect, useRef } from 'react'
import DailyIframe from '@daily-co/daily-js'

const VideoCallFrame = ({ url }) => {

    const videoFrame = useRef(null)

    useEffect(() => {
        const daily = DailyIframe.wrap(videoFrame.current)
        daily.join({ url })
    })

    return (
        <iframe
            className="Video-Frame"
            title="video call iframe"
            ref={videoFrame}
            allow="camera; microphone; fullscreen"
        />
    )
}

export default VideoCallFrame