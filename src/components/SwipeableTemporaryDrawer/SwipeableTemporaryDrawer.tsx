import React from 'react'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import MenuIcon from '@material-ui/icons/Menu'
import Divider from '@material-ui/core/Divider'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Logo from 'src/components/Logo/Logo'
import { useTranslation } from 'react-i18next'

import styled from 'styled-components'
import HomeIcon from '@material-ui/icons/Home'
import DuoIcon from '@material-ui/icons/Duo'
import SubjectIcon from '@material-ui/icons/Subject'
import PersonIcon from '@material-ui/icons/Person'
import InfoIcon from '@material-ui/icons/Info'
import { IonItem, IonList } from '@ionic/react'
import Lang from '../Lang/Lang'

const LogoContainer = styled.div`
    padding-left: 25%;
    padding-right: 25%;
`

const useStyles = makeStyles({
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
    languagePicker: {
        marginLeft: '1rem',
    },
})

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
                            title: t('footer.about'),
                            icon: <InfoIcon />,
                            url: `/${t('url.credits')}`,
                        },
                    ].map(({ title, icon, url }) => (
                        <ListItem button key={title}>
                            <IonItem routerLink={url}>
                                <ListItemIcon>{icon}</ListItemIcon>
                                <ListItemText primary={title} />
                            </IonItem>
                        </ListItem>
                    ))}
                </IonList>
                <Divider />
            </div>
        </div>
    )

    const anchor = 'left'
    return (
        <div>
            {
                <React.Fragment key={anchor}>
                    <MenuIcon onClick={toggleDrawer(anchor, true)}></MenuIcon>
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
