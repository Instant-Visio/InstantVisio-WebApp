import React, { useState } from 'react'

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

    const svgDValue = active ?
        'M15 2h2v5h7v2h-9v-7zm9 13v2h-7v5h-2v-7h9zm-15 7h-2v-5h-7v-2h9v7zm-9-13v-2h7v-5h2v7h-9z' :
        'M24 9h-2v-5h-7v-2h9v7zm-9 13v-2h7v-5h2v7h-9zm-15-7h2v5h7v2h-9v-7zm9-13v2h-7v5h-2v-7h9z'

    return (
        <>
            <FullscreenWrapper
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                onClick={toggleFullScreen}
            >
                <path d={svgDValue}/>
            </FullscreenWrapper>
        </>
    )
}

export default Fullscreen
