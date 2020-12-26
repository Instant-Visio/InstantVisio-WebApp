import React, { useState } from 'react'
import CapabilitiesDialog from './permissions/CapabilitiesDialog'
import VideoCallPage from './VideoCall'
import { CallContainer } from './VideoCallComponents'

const VideoCallPrecheck = () => {
    const [checkPass, setCheckPass] = useState(false)

    if (checkPass) {
        return <VideoCallPage />
    }

    return (
        <>
            <CallContainer />
            <CapabilitiesDialog
                onGranted={() => setCheckPass(true)}
                onSkip={() => setCheckPass(true)}
            />
        </>
    )
}

export default VideoCallPrecheck
