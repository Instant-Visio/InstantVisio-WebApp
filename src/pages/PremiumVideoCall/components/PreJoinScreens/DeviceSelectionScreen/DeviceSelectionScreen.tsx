/**
 * This file was modified by
 * Mattia Primavera <sconqua@gmail.com>
 */

import React from 'react'
import {
    makeStyles,
    Typography,
    Grid,
    Button,
    Theme,
    Hidden,
} from '@material-ui/core'
import LocalVideoPreview from './LocalVideoPreview/LocalVideoPreview'
import SettingsMenu from './SettingsMenu/SettingsMenu'
import { Steps } from '../PreJoinScreens'
import ToggleAudioButton from '../../Buttons/ToggleAudioButton/ToggleAudioButton'
import ToggleVideoButton from '../../Buttons/ToggleVideoButton/ToggleVideoButton'
import { useAppState } from '../../../state'
import useVideoContext from '../../../hooks/useVideoContext/useVideoContext'
import { Api } from '../../../../../services/api'
import { selectToken } from '../../../../../utils/selectors'
import { useSelector, useDispatch } from 'react-redux'
import { RoomId } from '../../../../../../types/Room'
import * as actions from '../../../../../actions/actions'

const useStyles = makeStyles((theme: Theme) => ({
    gutterBottom: {
        marginBottom: '1em',
    },
    marginTop: {
        marginTop: '1em',
    },
    deviceButton: {
        width: '100%',
        border: '2px solid #aaa',
        margin: '1em 0',
    },
    localPreviewContainer: {
        paddingRight: '2em',
        [theme.breakpoints.down('sm')]: {
            padding: '0 2.5em',
        },
    },
    joinButtons: {
        display: 'flex',
        justifyContent: 'space-between',
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column-reverse',
            width: '100%',
            '& button': {
                margin: '0.5em 0',
            },
        },
    },
    mobileButtonBar: {
        [theme.breakpoints.down('sm')]: {
            display: 'flex',
            justifyContent: 'space-between',
            margin: '1.5em 0 1em',
        },
    },
    mobileButton: {
        padding: '0.8em 0',
        margin: 0,
    },
}))

interface DeviceSelectionScreenProps {
    name: string
    roomId: RoomId
    setStep: (step: Steps) => void
}

export default function DeviceSelectionScreen({
    name,
    roomId,
    setStep,
}: DeviceSelectionScreenProps) {
    const classes = useStyles()
    const { isFetching } = useAppState()
    const token = useSelector(selectToken)
    const dispatch = useDispatch()
    const { connect, isAcquiringLocalTracks, isConnecting } = useVideoContext()
    const disableButtons = isFetching || isAcquiringLocalTracks || isConnecting

    const handleJoin = async () => {
        const api = new Api(token)
        const { jwtAccessToken } = await api.joinRoom(roomId, 'test-password') // TODO pass the password variable
        dispatch(actions.setRoomId(roomId))
        dispatch(actions.setHostName(name))
        connect(jwtAccessToken, roomId)
    }

    return (
        <>
            <Typography variant="h5" className={classes.gutterBottom}>
                Join {roomId}
            </Typography>

            <Grid container justify="center">
                <Grid item md={7} sm={12} xs={12}>
                    <div className={classes.localPreviewContainer}>
                        <LocalVideoPreview identity={name} />
                    </div>
                    <div className={classes.mobileButtonBar}>
                        <Hidden mdUp>
                            <ToggleAudioButton
                                className={classes.mobileButton}
                                disabled={disableButtons}
                            />
                            <ToggleVideoButton
                                className={classes.mobileButton}
                                disabled={disableButtons}
                            />
                        </Hidden>
                        <SettingsMenu
                            mobileButtonClass={classes.mobileButton}
                        />
                    </div>
                </Grid>
                <Grid item md={5} sm={12} xs={12}>
                    <Grid
                        container
                        direction="column"
                        justify="space-between"
                        style={{ height: '100%' }}>
                        <div>
                            <Hidden smDown>
                                <ToggleAudioButton
                                    className={classes.deviceButton}
                                    disabled={disableButtons}
                                />
                                <ToggleVideoButton
                                    className={classes.deviceButton}
                                    disabled={disableButtons}
                                />
                            </Hidden>
                        </div>
                        <div className={classes.joinButtons}>
                            <Button
                                variant="outlined"
                                color="primary"
                                onClick={() => setStep(Steps.roomNameStep)}>
                                Cancel
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                data-cy-join-now
                                onClick={() => handleJoin()}
                                disabled={disableButtons}>
                                Join Now
                            </Button>
                        </div>
                    </Grid>
                </Grid>
            </Grid>
        </>
    )
}
