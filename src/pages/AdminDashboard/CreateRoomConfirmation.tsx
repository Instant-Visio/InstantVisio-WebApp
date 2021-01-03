import React from 'react'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import Box from '@material-ui/core/Box'
import { useTranslation } from 'react-i18next'
import { useSelector, useDispatch } from 'react-redux'
import { selectCreatedRoom } from './roomsSelector'
import { Link } from 'react-router-dom'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { preventDefault } from './UserDetails'
import { Button } from './CreateRoomForm/CreateRoomForm'
import { resetRoomCreated } from './roomsActions'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles({
    paper: {
        padding: '1em',
        border: '2px dashed',
    },
})

export default function CreateRoomConfirmation() {
    const { t } = useTranslation('dashboard')
    const createdRoom = useSelector(selectCreatedRoom)
    const dispatch = useDispatch()

    const formatJoinDiscussionLink = (roomUrl: string) => {
        const premiumVideoPagePrefixUrl = '/premium-video'
        const routerUrl = roomUrl.split(premiumVideoPagePrefixUrl)[1]
        return `${premiumVideoPagePrefixUrl}${routerUrl}`
    }

    const classes = useStyles()

    const createDiscussion = () => {
        dispatch(resetRoomCreated())
    }

    return (
        <>
            <Typography variant="h5" component="h1">
                {t('confirmation.heading', { roomName: createdRoom.name })}
            </Typography>
            <Box m={2} />
            <Paper elevation={0} className={classes.paper}>
                {t('confirmation.message', {
                    hostName: '', //todo not return yet by api,
                    link: createdRoom.roomUrl,
                    interpolation: {
                        escapeValue: false,
                    },
                })}
            </Paper>
            <Box m={4} />

            <Typography variant="h5" component="h1">
                <Link to={formatJoinDiscussionLink(createdRoom.roomUrl)}>
                    Start discussion
                </Link>
            </Typography>
            <CopyToClipboard text={createdRoom.roomUrl}>
                <Link to={'#'} onClick={preventDefault}>
                    {'Cliquer pour copier le lien à partager'}
                </Link>
            </CopyToClipboard>
            <Button color="primary" onClick={createDiscussion}>
                {'Créer une nouvelle discussion'}
            </Button>
        </>
    )
}
