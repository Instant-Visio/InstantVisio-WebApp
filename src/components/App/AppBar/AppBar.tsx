import React from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import { AppBar as MaterialAppBar } from '@material-ui/core'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import SwipeableTemporaryDrawer from '../../SwipeableTemporaryDrawer/SwipeableTemporaryDrawer'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { showLoginModal } from '../../LoginModal/loginModalActions'
import { signOut } from '../../../actions/userActions'
import { useHistory } from 'react-router-dom'
import { selectIsPremiumUser } from '../userSelector'
import { isNative } from '../../../services/platform'
import { showJoinGroupModal } from '../../JoinGroup/joinGroupModalActions'
import Logo from '../../Logo/Logo'
import { selectAppBar } from './redux/appBarSelectors'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
            color: 'white',
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
    })
)

const LogoWrapper = styled.div`
    display: flex;
    flex-grow: 1;
    align-items: center;
    @media screen and (max-width: 1023px) {
        a {
            width: 60px;
        }
    }
`

const WhiteAppBar = styled.div`
    .MuiAppBar-colorPrimary {
        background-color: white;
        padding: 8px 0;

        @media screen and (min-width: 1024px) {
            padding: 16px 0;
        }
    }
`

const AppBar = () => {
    const classes = useStyles()
    const isPremiumUser = useSelector(selectIsPremiumUser)
    const { t } = useTranslation('common')
    const dispatch = useDispatch()
    const history = useHistory()
    const { isDisplayed } = useSelector(selectAppBar)

    const openJoinGroupModal = () => {
        dispatch(showJoinGroupModal())
    }

    return (
        isDisplayed && (
            <div className={classes.root}>
                <WhiteAppBar>
                    <MaterialAppBar color="primary" position="static">
                        <Toolbar>
                            <LogoWrapper>
                                <Logo />
                            </LogoWrapper>
                            {isNative() && (
                                <Button
                                    onClick={openJoinGroupModal}
                                    color="primary">
                                    {t('appBar.joinGroupButton')}
                                </Button>
                            )}
                            {isPremiumUser ? (
                                <Button
                                    onClick={() => {
                                        dispatch(signOut())
                                        history.replace('/')
                                    }}>
                                    {t('appBar.signOutButton')}
                                </Button>
                            ) : (
                                <Button
                                    onClick={() => dispatch(showLoginModal())}
                                    color="primary">
                                    {t('appBar.loginButton')}
                                </Button>
                            )}
                            <SwipeableTemporaryDrawer />
                        </Toolbar>
                    </MaterialAppBar>
                </WhiteAppBar>
            </div>
        )
    )
}

export default AppBar
