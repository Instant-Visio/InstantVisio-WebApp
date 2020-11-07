import React, { useState } from 'react'

import Icon from '@mdi/react'
import { mdiFullscreen, mdiFullscreenExit } from '@mdi/js'

import FullscreenWrapper from './Fullscreen'

const Fullscreen = () => {
    const [active, setActive] = useState(false)

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
        <FullscreenWrapper onClick={toggleFullScreen}>
            {active ? (
                <Icon size={2} path={mdiFullscreenExit} />
            ) : (
                <Icon size={2} path={mdiFullscreen} />
            )}
        </FullscreenWrapper>
    )
}

export default Fullscreen
