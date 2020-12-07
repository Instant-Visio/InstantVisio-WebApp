import React from 'react'
import { IframeContainer } from './VideoCallComponents'
import { useTranslation } from 'react-i18next'
import classNames from 'classnames'
import { Redirect } from 'react-router-dom'
import * as LocalStorage from 'src/services/local-storage'

const VideoCallFrame = ({
    participantsNumber,
    participantStatus,
    hasLeft,
    camOn,
    videoFrame,
}) => {
    const { t } = useTranslation('videocall')

    if (hasLeft) {
        LocalStorage.removeLastVideoCallId()
    }

    return (
        <IframeContainer>
            {!hasLeft && (
                <iframe
                    className="iframe"
                    title="video call iframe"
                    ref={videoFrame}
                    allow="microphone; camera; autoplay"
                    allowFullScreen
                />
            )}
            {!camOn && !hasLeft && (
                <div
                    className={classNames({
                        'mute-camera': true,
                        'mute-camera-two': participantsNumber < 3,
                        'mute-camera-three': participantsNumber === 3,
                        'mute-camera-four': participantsNumber === 4,
                    })}>
                    {t('turn-on-cam-message')}
                </div>
            )}

            {!hasLeft && (
                <div className="waiting-participant">{participantStatus}</div>
            )}

            {hasLeft && <Redirect to="/" />}
        </IframeContainer>
    )
}

export default VideoCallFrame
