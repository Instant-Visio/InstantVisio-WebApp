import React from 'react'
import clsx from 'clsx'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import MenuIcon from '@material-ui/icons/Menu'
import Divider from '@material-ui/core/Divider'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Logo from '../Logo/Logo'
import { useTranslation } from 'react-i18next'

import styled from 'styled-components'
import HomeIcon from '@material-ui/icons/Home'
import DuoIcon from '@material-ui/icons/Duo'
import SubjectIcon from '@material-ui/icons/Subject'
import PersonIcon from '@material-ui/icons/Person'
import InfoIcon from '@material-ui/icons/Info'
import { IonItem, IonList } from '@ionic/react'
import Lang from '../Lang/Lang'
import { IconButton } from '@material-ui/core'
import { Link } from 'react-router-dom'
import NewsletterModal from '../../pages/Newsletter/NewsletterModal'
import { showPreferencesDialog } from '../../utils/gdpr'
import About from '../../documents/Instant_Visio_Keynote.pdf'

const LogoContainer = styled.div`
    padding-left: 35%;
    padding-right: 35%;
`

const StyledItem = styled.div`
    width: 100%;

    .MuiListItem-gutters {
        padding-left: 0;
        padding-right: 0;
    }
`

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        list: {
            width: 250,
        },
        fullList: {
            width: 'auto',
        },
        languagePicker: {
            marginLeft: '1rem',
        },
        menuButton: {
            marginLeft: theme.spacing(2),
        },
    })
)

export default function SwipeableTemporaryDrawer() {
    const classes = useStyles()
    const { t } = useTranslation()

    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    })

    const toggleDrawer = (anchor, open) => (event) => {
        if (
            event &&
            event.type === 'keydown' &&
            (event.key === 'Tab' || event.key === 'Shift')
        ) {
            return
        }

        setState({ ...state, [anchor]: open })
    }

    const list = (anchor) => (
        <div>
            <LogoContainer>
                <Logo />
            </LogoContainer>

            <Lang className={classes.languagePicker} />

            <div
                className={clsx(classes.list, {
                    [classes.fullList]: anchor === 'top' || anchor === 'bottom',
                })}
                role="presentation"
                onClick={toggleDrawer(anchor, false)}
                onKeyDown={toggleDrawer(anchor, false)}>
                <IonList lines="none">
                    {[
                        {
                            title: t('footer.home'),
                            icon: <HomeIcon />,
                            url: '/',
                        },
                        {
                            title: t('footer.visio'),
                            icon: <DuoIcon />,
                            url: `/${t('url.video-call')}/`,
                        },
                        {
                            title: t('footer.legal-mentions'),
                            icon: <SubjectIcon />,
                            url: `/${t('url.legal-mentions')}`,
                        },
                        {
                            title: t('footer.personal-data'),
                            icon: <PersonIcon />,
                            url: `/${t('url.personal-data')}`,
                        },
                        {
                            title: t('footer.credits'),
                            icon: <InfoIcon />,
                            url: `/${t('url.credits')}`,
                        },
                        {
                            url: `/${t('url.blog')}`,
                            icon: <InfoIcon />,
                            title: t('footer.blog'),
                        },
                        {
                            url: `/${t('url.media')}`,
                            icon: <InfoIcon />,
                            title: t('footer.media'),
                        },
                        {
                            url: `/${t('url.license')}`,
                            icon: <InfoIcon />,
                            title: t('footer.license'),
                        },
                    ].map(({ title, icon, url }) => (
                        <ListItem button key={title}>
                            <StyledItem>
                                <IonItem routerLink={url}>
                                    <ListItemIcon>{icon}</ListItemIcon>
                                    <ListItemText primary={title} />
                                </IonItem>
                            </StyledItem>
                        </ListItem>
                    ))}

                    <ListItem>
                        <IonItem>
                            <ListItemIcon>
                                <InfoIcon />
                            </ListItemIcon>
                            <a
                                className="footer-link-content"
                                href={`mailto:contact@instantvisio.com?Subject=${t(
                                    'footer.contact'
                                )}`}
                                target="_blank"
                                rel="noopener noreferrer">
                                {t('footer.contact-us')}
                            </a>{' '}
                        </IonItem>
                    </ListItem>

                    <ListItem>
                        <IonItem>
                            <ListItemIcon>
                                <InfoIcon />
                            </ListItemIcon>
                            <Link
                                to={About}
                                className="footer-link-content"
                                target="_blank"
                                rel="noopener noreferrer">
                                {t('footer.about')}
                            </Link>
                        </IonItem>
                    </ListItem>

                    <ListItem>
                        <IonItem>
                            <ListItemIcon>
                                <InfoIcon />
                            </ListItemIcon>
                            <Link to="" className="footer-link-content">
                                <NewsletterModal />
                            </Link>
                        </IonItem>
                    </ListItem>

                    <ListItem>
                        <IonItem
                            routerLink={''}
                            onClick={showPreferencesDialog}>
                            <ListItemIcon>
                                <InfoIcon />
                            </ListItemIcon>
                            <ListItemText primary={t('footer.cookies')} />
                        </IonItem>
                    </ListItem>
                </IonList>
                <Divider />
            </div>
        </div>
    )

    const anchor = 'right'
    return (
        <div>
            {
                <React.Fragment key={anchor}>
                    <IconButton
                        edge="end"
                        className={classes.menuButton}
                        color="inherit"
                        onClick={toggleDrawer(anchor, true)}
                        aria-label="menu">
                        <MenuIcon color="primary" />
                    </IconButton>

                    <SwipeableDrawer
                        anchor={anchor}
                        open={state[anchor]}
                        onClose={toggleDrawer(anchor, false)}
                        onOpen={toggleDrawer(anchor, true)}>
                        {list(anchor)}
                    </SwipeableDrawer>
                </React.Fragment>
            }
        </div>
    )
}
