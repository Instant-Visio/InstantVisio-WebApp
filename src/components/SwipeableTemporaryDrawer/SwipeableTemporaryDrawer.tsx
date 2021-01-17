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
import { mdiAccountGroup } from '@mdi/js'
import { mdiPost } from '@mdi/js'
import { mdiNewspaperVariantMultipleOutline } from '@mdi/js'
import { mdiLicense } from '@mdi/js'
import { mdiDeskphone } from '@mdi/js'
import { mdiInformation } from '@mdi/js'
import { mdiEmailNewsletter } from '@mdi/js'
import { mdiShieldAccount } from '@mdi/js'
import { mdiCookie } from '@mdi/js'
import DuoIcon from '@material-ui/icons/Duo'
import SubjectIcon from '@material-ui/icons/Subject'
import InfoIcon from '@material-ui/icons/Info'
import { IonItem, IonList } from '@ionic/react'
import Lang from '../Lang/Lang'
import { IconButton, SvgIcon } from '@material-ui/core'
import { useDispatch } from 'react-redux'
import { showPreferencesDialog } from '../../utils/gdpr'
import About from '../../documents/Instant_Visio_Keynote.pdf'
import { showModal } from '../Modal/modalAction'
import packageJson from '../../../package.json'

const Wrapper = styled.div`
    p {
        margin-bottom: 0;
    }
`

const StyledLogo = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 16px;
    margin-bottom: 16px;
`

const AppVersion = styled.p`
    color: black;
    text-align: center;
`

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        list: {
            width: 250,
        },
        listItem: {
            padding: 0,
        },
        item: {
            width: '100%',
            padding: 0,
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
    const dispatch = useDispatch()

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
        <Wrapper>
            <StyledLogo>
                <Logo />
            </StyledLogo>
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
                            icon: (
                                <SvgIcon>
                                    <path d={mdiShieldAccount} />
                                </SvgIcon>
                            ),
                            url: `/${t('url.personal-data')}`,
                        },
                        {
                            title: t('footer.credits'),
                            icon: (
                                <SvgIcon>
                                    <path d={mdiAccountGroup} />
                                </SvgIcon>
                            ),
                            url: `/${t('url.credits')}`,
                        },
                        {
                            url: `/${t('url.blog')}`,
                            icon: (
                                <SvgIcon>
                                    <path d={mdiPost} />
                                </SvgIcon>
                            ),
                            title: t('footer.blog'),
                        },
                        {
                            url: `/${t('url.media')}`,
                            icon: (
                                <SvgIcon>
                                    <path
                                        d={mdiNewspaperVariantMultipleOutline}
                                    />
                                </SvgIcon>
                            ),
                            title: t('footer.media'),
                        },
                        {
                            url: `/${t('url.license')}`,
                            icon: (
                                <SvgIcon>
                                    <path d={mdiLicense} />
                                </SvgIcon>
                            ),
                            title: t('footer.license'),
                        },
                    ].map(({ title, icon, url }) => (
                        <ListItem
                            button
                            key={title}
                            className={classes.listItem}>
                            <IonItem routerLink={url} className={classes.item}>
                                <ListItemIcon>{icon}</ListItemIcon>
                                <ListItemText primary={title} />
                            </IonItem>
                        </ListItem>
                    ))}

                    <ListItem button className={classes.listItem}>
                        <IonItem
                            className={classes.item}
                            href={`mailto:contact@instantvisio.com?Subject=${t(
                                'footer.contact'
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer">
                            <ListItemIcon>
                                <SvgIcon>
                                    <path d={mdiDeskphone} />
                                </SvgIcon>
                            </ListItemIcon>
                            <ListItemText primary={t('footer.contact-us')} />
                        </IonItem>
                    </ListItem>

                    <ListItem button className={classes.listItem}>
                        <IonItem
                            className={classes.item}
                            href={About}
                            rel="noopener noreferrer"
                            target="_blank">
                            <ListItemIcon>
                                <SvgIcon>
                                    <path d={mdiInformation} />
                                </SvgIcon>
                            </ListItemIcon>
                            <ListItemText primary={t('footer.about')} />
                        </IonItem>
                    </ListItem>

                    <ListItem button className={classes.listItem}>
                        <IonItem
                            button
                            className={classes.item}
                            onClick={() => dispatch(showModal('Newsletter'))}>
                            <ListItemIcon>
                                <SvgIcon>
                                    <path d={mdiEmailNewsletter} />
                                </SvgIcon>
                            </ListItemIcon>
                            <ListItemText primary={t('footer.newsletter')} />
                        </IonItem>
                    </ListItem>

                    <ListItem button className={classes.listItem}>
                        <IonItem
                            button
                            onClick={showPreferencesDialog}
                            className={classes.item}>
                            <ListItemIcon>
                                <SvgIcon>
                                    <path d={mdiCookie} />
                                </SvgIcon>
                            </ListItemIcon>
                            <ListItemText primary={t('footer.cookies')} />
                        </IonItem>
                    </ListItem>
                </IonList>
                <Divider />
                <AppVersion>v{packageJson.version}</AppVersion>
            </div>
        </Wrapper>
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
