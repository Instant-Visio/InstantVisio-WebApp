import React from 'react'
import { IframeContainer } from './VideoCallComponents'
import { useTranslation } from 'react-i18next'
import classNames from 'classnames'
import { Redirect } from 'react-router-dom'
import * as LocalStorage from '../../services/local-storage'
import { RatingModal } from '../../components/RatingModal'
import { Button } from 'react-bootstrap'
import image from '../../styles/assets/images/media/present2.png'

const VideoCallFrame = ({
    participantsNumber,
    participantStatus,
    hasLeft,
    camOn,
    videoFrame,
}) => {
    const { t } = useTranslation('videocall')
    const [redirectToRoot, setRedirectToRoot] = React.useState(false)

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

            {redirectToRoot && <Redirect to="/" />}

            {hasLeft && (
                <div>
                    <p>
                        <img
                            src={image}
                            alt="Joyeux noel"
                            height="300"
                            width="300"
                        />
                    </p>
                    <p
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignSelf: 'center',
                        }}>
                        {t('leave-confirmation')}
                    </p>
                    <p
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignSelf: 'center',
                        }}>
                        <Button
                            variant="primary"
                            onClick={() => {
                                // noinspection JSIgnoredPromiseFromCall
                                setRedirectToRoot(true)
                            }}>
                            Merci
                        </Button>
                    </p>
                    <RatingModal hasLeft />
                </div>
            )}
        </IframeContainer>
    )
}

export default VideoCallFrame
