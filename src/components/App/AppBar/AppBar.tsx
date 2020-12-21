import React from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import { AppBar as MaterialAppBar } from '@material-ui/core'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import SwipeableTemporaryDrawer from '../../SwipeableTemporaryDrawer/SwipeableTemporaryDrawer'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'

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

export default function AppBar() {
    const classes = useStyles()
    const { t } = useTranslation('common')

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
                        <Button color="primary">
                            {t('appBar.joinVisioButton')}
                        </Button>
                        <Button color="primary">
                            {t('appBar.loginButton')}
                        </Button>
                        <SwipeableTemporaryDrawer />
                    </Toolbar>
                </MaterialAppBar>
            </WhiteAppBar>
        </div>
    )
}
