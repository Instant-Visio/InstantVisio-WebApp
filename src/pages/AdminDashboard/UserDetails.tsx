import React from 'react'
import Paper from '@material-ui/core/Paper'
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline'
import RestaurantIcon from '@material-ui/icons/Restaurant'
import FingerprintIcon from '@material-ui/icons/Fingerprint'
import Divider from '@material-ui/core/Divider'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Link from '@material-ui/core/Link'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import EditIcon from '@material-ui/icons/Edit'
import { IconButton } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import { selectRooms } from './roomsSelector'
import { useSelector } from 'react-redux'
import {
    selectUser,
    selectQuotasUsage,
    QuotasUsage,
} from '../../components/App/userSelector'
import { useTranslation } from 'react-i18next'

export const preventDefault = (event: React.SyntheticEvent) =>
    event.preventDefault()

const formatStartAtDate = (room: any) => {
    const date = new Date(room.startAt * 1000)
    return date.toLocaleDateString()
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        icon: {
            marginLeft: theme.spacing(2),
        },
        textRight: {
            textAlign: 'right',
        },
        list: {
            paddingTop: 0,
            paddingBottom: 0,
        },
        listItem: {
            paddingTop: 0,
            paddingBottom: 0,
        },
        apiTokenListItem: {
            wordWrap: 'break-word',
        },
    })
)

const UserDetails = ({ onRoomEdit }) => {
    const classes = useStyles()
    const rooms = useSelector(selectRooms)
    const { token } = useSelector(selectUser)
    const quotasUsage: QuotasUsage = useSelector(selectQuotasUsage)
    const { t } = useTranslation('dashboard')

    //TODO better to export in a fc
    const renderQuotasUsage = () => {
        if (!quotasUsage) return null

        const { minutes, ...quotas } = quotasUsage
        return (
            <>
                {Object.entries(quotas).map(([type, value], index) => (
                    <ListItem
                        className={classes.listItem}
                        key={`quota-${index}`}>
                        <ListItemText
                            primary={`${value.sent} ${type} ${t('on')} ${
                                value.quota
                            } ${t('available')}`}
                        />
                    </ListItem>
                ))}
                <ListItem className={classes.listItem}>
                    <ListItemText
                        primary={`${minutes} min ${t('available')}`}
                    />
                </ListItem>
            </>
        )
    }

    return (
        <>
            <Paper elevation={0}>
                <Grid container alignItems="center" spacing={2}>
                    <Grid item>
                        <ChatBubbleOutlineIcon className={classes.icon} />
                    </Grid>
                    <Grid item>
                        <Typography variant="h6">
                            {t('planned-discussions')}
                        </Typography>
                    </Grid>
                </Grid>
                <Divider />
                <List component="nav" className={classes.list}>
                    {rooms.map((room) => {
                        return (
                            <ListItem
                                key={room.id}
                                className={classes.listItem}>
                                <ListItemText primary={room.name} />
                                <ListItemText
                                    primary={formatStartAtDate(room)}
                                    primaryTypographyProps={{
                                        align: 'right',
                                    }}
                                />
                                <IconButton onClick={() => onRoomEdit(room)}>
                                    <EditIcon />
                                </IconButton>
                                <Divider variant="middle" />
                            </ListItem>
                        )
                    })}
                </List>
            </Paper>
            <Box m={6} />
            <Paper elevation={0}>
                <Grid container alignItems="center" spacing={2}>
                    <Grid item>
                        <RestaurantIcon className={classes.icon} />
                    </Grid>
                    <Grid item>
                        <Typography variant="h6">{t('consumption')}</Typography>
                    </Grid>
                </Grid>
                <Divider />
                <List component="nav" className={classes.list}>
                    {renderQuotasUsage()}
                </List>
            </Paper>

            <Box m={6} />

            <Paper elevation={0}>
                <Grid container alignItems="center" spacing={2}>
                    <Grid item>
                        <FingerprintIcon className={classes.icon} />
                    </Grid>
                    <Grid item>
                        <Typography variant="h6">
                            {t('api-identifier')}
                        </Typography>
                    </Grid>
                    <Grid item xs className={classes.textRight}>
                        <CopyToClipboard text={token}>
                            <Link
                                href="#"
                                onClick={preventDefault}
                                variant="body2">
                                {t('click-to-copy')}
                            </Link>
                        </CopyToClipboard>
                    </Grid>
                </Grid>
                <Divider />
                <ListItem className={classes.list}>
                    <ListItemText
                        className={classes.apiTokenListItem}
                        primary={token}
                    />
                </ListItem>
            </Paper>
        </>
    )
}

export default UserDetails
