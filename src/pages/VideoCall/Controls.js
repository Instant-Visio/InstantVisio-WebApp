import React from 'react'
import classNames from 'classnames'
import Icon from '@mdi/react'
import {
    mdiExitToApp,
    mdiHelpCircle,
    mdiMicrophone,
    mdiMicrophoneOff,
    mdiVideo,
    mdiVideoOff,
} from '@mdi/js'
import { toggleSupport } from '../../utils/support'
import { ControlsContainer } from './VideoCallComponents'
import { useTranslation } from 'react-i18next'

const Controls = ({ camOn, onCamClick, micOn, onMicClick, onLeaveClick }) => {
    const { t } = useTranslation('videocall')

    return (
        <ControlsContainer>
            <div className="controlContainer">
                <div
                    onClick={onCamClick}
                    className={classNames({
                        control: true,
                        green: camOn,
                        red: !camOn,
                    })}>
                    {camOn ? (
                        <Icon size={1} path={mdiVideo} />
                    ) : (
                        <Icon size={1} path={mdiVideoOff} />
                    )}
                    <p>{t('cam')}</p>
                </div>
                <div
                    onClick={onMicClick}
                    className={classNames({
                        control: true,
                        green: micOn,
                        red: !micOn,
                    })}>
                    {micOn ? (
                        <Icon size={1} path={mdiMicrophone} />
                    ) : (
                        <Icon size={1} path={mdiMicrophoneOff} />
                    )}
                    <p>{t('audio')}</p>
                </div>
            </div>
            <div className="controlContainer">
                <div onClick={onLeaveClick} className="control red leave">
                    <Icon size={1} path={mdiExitToApp} />
                    <p>{t('leave')}</p>
                </div>
                <div onClick={toggleSupport} className="control">
                    <Icon size={1} path={mdiHelpCircle} />
                    <p>{t('help')}</p>
                </div>
            </div>
        </ControlsContainer>
    )
}

export default Controls
