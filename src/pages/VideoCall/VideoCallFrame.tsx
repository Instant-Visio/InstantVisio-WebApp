import React from 'react'
import { IframeContainer } from './VideoCallComponents'
import { useTranslation } from 'react-i18next'
import classNames from 'classnames'
import { Redirect } from 'react-router-dom'
import * as LocalStorage from '../../services/local-storage'
import Card from '../../components/Card/Card'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Rating from '@material-ui/lab/Rating'
import { addCallRating } from '../../actions/addCallRating'

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 1500,
        [theme.breakpoints.down('md')]: {
            maxWidth: 300,
        },
    },
}))

const VideoCallFrame = ({
    participantsNumber,
    participantStatus,
    hasLeft,
    camOn,
    videoFrame,
}) => {
    const { t } = useTranslation('videocall')
    const [redirectToRoot, setRedirectToRoot] = React.useState(false)
    const [value, setValue] = React.useState<number | null>(0)
    const classes = useStyles()
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
                    <Card onClick={(val) => setRedirectToRoot(val)} />
                    <Grid
                        container
                        justify="center"
                        alignItems="center"
                        className={classes.root}>
                        <Typography
                            style={{ textAlign: 'center', marginTop: 20 }}
                            variant="h5"
                            component="h6">
                            Pour nous aider à Améliorer notre service, vous
                            pouvez noter la qualité de votre visio.
                        </Typography>
                    </Grid>
                    <Grid container justify="center" alignItems="center">
                        <Rating
                            value={value}
                            precision={1}
                            onChange={(event, value) => {
                                setValue(value)
                                addCallRating(value)
                            }}
                        />
                    </Grid>
                </div>
            )}
        </IframeContainer>
    )
}

export default VideoCallFrame
