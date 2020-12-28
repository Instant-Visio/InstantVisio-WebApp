import React from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import { AppBar as MaterialAppBar } from '@material-ui/core'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import SwipeableTemporaryDrawer from '../../SwipeableTemporaryDrawer/SwipeableTemporaryDrawer'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { showLoginModal } from '../../LoginModal/loginModalActions'
import { signOut } from '../../../actions/userActions'
import { useHistory } from 'react-router-dom'
import { selectIsPremiumUser } from '../userSelector'
import { openPremiumVideoCall } from '../../../services/safari-view-controller'
import { isMobile } from '../../../services/platform'
import { showJoinGroupModal } from '../../JoinGroup/joinGroupModalActions'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
            color: 'white',
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            flexGrow: 1,
        },
    })
)

const WhiteAppBar = styled.div`
    .MuiAppBar-colorPrimary {
        background-color: white;
    }
`

const AppBar = () => {
    const classes = useStyles()
    const isPremiumUser = useSelector(selectIsPremiumUser)
    const { t } = useTranslation('common')
    const dispatch = useDispatch()
    const history = useHistory()

    const renderLoginLogoutBtn = () => {
        if (!isMobile()) {
            return isPremiumUser ? (
                <Button
                    onClick={() => {
                        dispatch(signOut())
                        history.replace('/')
                    }}>
                    Sign out
                </Button>
            ) : (
                <Button
                    onClick={() => dispatch(showLoginModal())}
                    color="primary">
                    {t('appBar.loginButton')}
                </Button>
            )
        }
    }

    const openJoinGroupModal = () => {
        dispatch(showJoinGroupModal())
    }

    return (
        <div className={classes.root}>
            <WhiteAppBar>
                <MaterialAppBar color="primary" position="static">
                    <Toolbar>
                        <Typography
                            color="primary"
                            variant="h6"
                            className={classes.title}>
                            {t('appBar.appName')}
                        </Typography>
                        <Button
                            onClick={openJoinGroupModal} //openPremiumVideoCall(history)}
                            color="primary">
                            {t('appBar.joinGroupButton')}
                        </Button>
                        {renderLoginLogoutBtn()}

                        <SwipeableTemporaryDrawer />
                    </Toolbar>
                </MaterialAppBar>
            </WhiteAppBar>
        </div>
    )
}

export default AppBar
