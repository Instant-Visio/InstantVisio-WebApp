import React, { useEffect } from 'react'
import { IonContent } from '@ionic/react'
import Typography from '@material-ui/core/Typography'
import { ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import theme from '../../styles/muiTheme'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Paper from '@material-ui/core/Paper'
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline'
import RestaurantIcon from '@material-ui/icons/Restaurant'
import FingerprintIcon from '@material-ui/icons/Fingerprint'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import Divider from '@material-ui/core/Divider'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Link from '@material-ui/core/Link'
import CreateRoomForm from './CreateRoomForm'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { selectUser } from '../../components/App/userSelector'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { Api } from '../../services/api'
import { UserDetailsRetrieved } from '../../actions/userActions'
import { useDispatch } from 'react-redux'
import { getRooms } from './roomsActions'
import { selectRooms } from './roomsSelector'
import EditIcon from '@material-ui/icons/Edit'
import { IconButton } from '@material-ui/core'

const AdminDashboard = () => {
    const dispatch = useDispatch()
    const { t } = useTranslation('dashboard')
    const { userId, token, details } = useSelector(selectUser)
    const { rooms } = useSelector(selectRooms)

    useEffect(() => {
        const getUserDetails = async () => {
            const api = new Api(token)
            const userDetails = await api.getUserDetails(userId)
            dispatch(UserDetailsRetrieved(userDetails))
        }

        if (token) {
            getUserDetails()
            dispatch(getRooms(t))
        }
    }, [token, userId, dispatch, t])

    const preventDefault = (event: React.SyntheticEvent) =>
        event.preventDefault()

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

    const classes = useStyles()

    const onFormSubmit = () => {
        openPremiumVideoCall(history)
    }

    const getSMSUsage = () => details?.usage?.sentSMSs

    const getSMSQuota = () => details?.subscription?.quotas?.sms

    const formatStartAtDate = (room: any) => {
        const date = new Date(room.startAt * 1000)
        return date.toLocaleDateString()
    }

    // const editRoom = (room) => {
    //     formValues = {
    //         ...formValues,
    //         ...{
    //             roomName: room.name,
    //         },
    //     }

    //     console.log('FormValues: ', formValues)
    // }

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <IonContent style={{ '--background': 'white' }}>
                <Container maxWidth="lg">
                    <Box m={6} />
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <CreateRoomForm onFormSubmit={onFormSubmit} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Paper elevation={0}>
                                <Grid container alignItems="center" spacing={2}>
                                    <Grid item>
                                        <ChatBubbleOutlineIcon
                                            className={classes.icon}
                                        />
                                    </Grid>
                                    <Grid item>
                                        <Typography variant="h6">
                                            {t('planned-discussions')}
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Divider />
                                <List component="nav" className={classes.list}>
                                    {rooms.map((room, i) => {
                                        return (
                                            <>
                                                <ListItem
                                                    key={i}
                                                    className={
                                                        classes.listItem
                                                    }>
                                                    <ListItemText
                                                        primary={room.name}
                                                    />
                                                    <ListItemText
                                                        primary={formatStartAtDate(
                                                            room
                                                        )}
                                                        primaryTypographyProps={{
                                                            align: 'right',
                                                        }}
                                                    />
                                                    <IconButton
                                                        onClick={() =>
                                                            editRoom(room)
                                                        }>
                                                        <EditIcon />
                                                    </IconButton>
                                                </ListItem>
                                                <Divider variant="middle" />
                                            </>
                                        )
                                    })}
                                    <ListItem
                                        key={10}
                                        className={classes.listItem}>
                                        <ListItemText primary="ROOM1" />
                                        <ListItemText
                                            primary="29/10"
                                            primaryTypographyProps={{
                                                align: 'right',
                                            }}
                                        />
                                        <IconButton>
                                            <EditIcon />
                                        </IconButton>
                                    </ListItem>
                                    <Divider variant="middle" />
                                </List>
                            </Paper>
                            <Box m={6} />
                            <Paper elevation={0}>
                                <Grid container alignItems="center" spacing={2}>
                                    <Grid item>
                                        <RestaurantIcon
                                            className={classes.icon}
                                        />
                                    </Grid>
                                    <Grid item>
                                        <Typography variant="h6">
                                            {t('consumption')}
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Divider />
                                <ListItem className={classes.list}>
                                    {details && (
                                        <ListItemText
                                            primary={`${
                                                getSMSUsage() !== undefined
                                                    ? getSMSUsage()
                                                    : '?'
                                            } SMS ${t('consumed')} ${t('on')} ${
                                                getSMSQuota() !== undefined
                                                    ? getSMSQuota()
                                                    : '?'
                                            } ${t('available')}`}
                                        />
                                    )}
                                </ListItem>
                            </Paper>

                            <Box m={6} />

                            <Paper elevation={0}>
                                <Grid container alignItems="center" spacing={2}>
                                    <Grid item>
                                        <FingerprintIcon
                                            className={classes.icon}
                                        />
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
                        </Grid>
                    </Grid>
                </Container>
            </IonContent>
        </ThemeProvider>
    )
}

export default AdminDashboard
