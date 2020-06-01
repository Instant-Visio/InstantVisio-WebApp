import React from 'react'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import MenuIcon from '@material-ui/icons/Menu'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Logo from '../Logo'
import { useTranslation } from 'react-i18next'

import styled from 'styled-components'
import HomeIcon from '@material-ui/icons/Home'
import DuoIcon from '@material-ui/icons/Duo'
import SubjectIcon from '@material-ui/icons/Subject'
import PersonIcon from '@material-ui/icons/Person'
import InfoIcon from '@material-ui/icons/Info'
import { useHistory } from 'react-router-dom'
import { Link } from 'react-router-dom'

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
})

export default function SwipeableTemporaryDrawer() {
    const classes = useStyles()
    const { t } = useTranslation()
    const history = useHistory()

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
        <div
            className={clsx(classes.list, {
                [classes.fullList]: anchor === 'top' || anchor === 'bottom',
            })}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}>
            <LogoContainer>
                <Logo />
            </LogoContainer>

            <List>
                {[
                    { title: 'Acceuil', icon: <HomeIcon />, url: '/' },
                    {
                        title: 'Visio',
                        icon: <DuoIcon />,
                        url: `/${t('url.video-call')}/`,
                    },
                    {
                        title: 'Mention légales',
                        icon: <SubjectIcon />,
                        url: `/${t('url.legal-mentions')}`,
                    },
                    {
                        title: 'Données Personnelles',
                        icon: <PersonIcon />,
                        url: `/${t('url.personal-data')}`,
                    },
                    {
                        title: 'À propos de nous',
                        icon: <InfoIcon />,
                        url: `/${t('url.credits')}`,
                    },
                ].map(({ title, icon, url }) => (
                    <ListItem button key={title}>
                        <Link to={url}>
                            <ListItemIcon>{icon}</ListItemIcon>
                            <ListItemText primary={title} />
                        </Link>
                    </ListItem>
                ))}
            </List>
            <Divider />
        </div>
    )

    return (
        <div>
            {['left'].map((anchor) => (
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
            ))}
        </div>
    )
}
