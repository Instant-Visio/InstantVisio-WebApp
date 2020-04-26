import React, { useState } from 'react'
import FullscreenIcon from '@material-ui/icons/Fullscreen'
import FullscreenExitIcon from '@material-ui/icons/FullscreenExit'

import FullscreenWrapper from './Fullscreen.js'

const Fullscreen = () => {
    const [ active, setActive ] = useState(false)

    const toggleFullScreen = () => {
        if (!document.fullscreenElement) {
            setActive(true)
            document.documentElement.requestFullscreen()
        } else {
            if (document.exitFullscreen) {
                setActive(false)
                document.exitFullscreen()
            }
        }
    }

    return (
        <FullscreenWrapper
            onClick={toggleFullScreen}
        >
            {active ? <FullscreenExitIcon /> : <FullscreenIcon />}
        </FullscreenWrapper>
    )
}

export default Fullscreen
