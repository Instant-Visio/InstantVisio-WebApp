import React from 'react'
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
import { useHistory } from 'react-router-dom'
import { openPremiumVideoCall } from '../../services/safari-view-controller'

const AdminDashboard = () => {
    const { t } = useTranslation('dashboard')
    const history = useHistory()
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
        })
    )

    const classes = useStyles()

    const onFormSubmit = () => {
        openPremiumVideoCall(history)
    }

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
                                    <ListItem className={classes.listItem}>
                                        <ListItemText primary="Comité de pilotage" />
                                        <ListItemText
                                            primary="30 mai"
                                            primaryTypographyProps={{
                                                align: 'right',
                                            }}
                                        />
                                    </ListItem>
                                    <Divider variant="middle" />
                                    <ListItem className={classes.list}>
                                        <ListItemText primary="Comité de pilotage" />
                                        <ListItemText
                                            primary="30 mai"
                                            primaryTypographyProps={{
                                                align: 'right',
                                            }}
                                        />
                                    </ListItem>
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
                                    <ListItemText
                                        primary={`250 SMS ${t('consumed')} ${t(
                                            'on'
                                        )} 500 ${t('available')}`}
                                    />
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
                                        <Link
                                            href="#"
                                            onClick={preventDefault}
                                            variant="body2">
                                            {t('click-to-copy')}
                                        </Link>
                                    </Grid>
                                </Grid>
                                <Divider />
                                <ListItem className={classes.list}>
                                    <ListItemText primary="fjqdkjvq7gjhqdjfd9fsdf767" />
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
