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
import Button from '../../components/Button/Button'
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
    const {
        roomUrl,
        name,
        hostName,
        hasDestinationSent,
        destinations,
    } = useSelector(selectCreatedRoom)
    const { email: emailCount, phone: phoneCount } = destinations || {}
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

    const renderDestinationSentMessage = () => {
        if (!hasDestinationSent) return null

        let message = t('confirmation.destinations-sent-phone', { phoneCount })

        if (emailCount > 0 && phoneCount > 0) {
            message = t('confirmation.destinations-sent', {
                phoneCount,
                emailCount,
            })
        } else if (emailCount > 0) {
            message = t('confirmation.destinations-sent-email', { emailCount })
        }

        return (
            <>
                <Typography>{message}</Typography>
                <Box m={2} />
            </>
        )
    }

    return (
        <>
            <Typography variant="h5" component="h1">
                {t('confirmation.heading', { roomName: name })}
            </Typography>
            <Box m={2} />
            {renderDestinationSentMessage()}
            <Typography>{t('confirmation.message-explanation')}</Typography>
            <Box m={2} />
            <Paper elevation={0} className={classes.paper}>
                {t('confirmation.message', {
                    hostName,
                    link: roomUrl,
                    interpolation: {
                        escapeValue: false,
                    },
                })}
            </Paper>
            <Box m={4} />

            <Typography variant="h5" component="h1">
                <Link to={formatJoinDiscussionLink(roomUrl)}>
                    {'Rejoindre la discussion'}
                </Link>
            </Typography>
            <CopyToClipboard text={roomUrl}>
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
