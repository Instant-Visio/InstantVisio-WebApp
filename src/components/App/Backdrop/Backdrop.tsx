import React from 'react'
import { selectBackdrop } from './backdropSelector'
import { Backdrop as MaterialBackdrop } from '@material-ui/core'
import CircularProgress from '@material-ui/core/CircularProgress'
import { useSelector } from 'react-redux'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        backdrop: {
            zIndex: theme.zIndex.drawer + 1,
            color: '#fff',
        },
    })
)

export default function Backdrop() {
    const classes = useStyles()
    const isDisplayed = useSelector(selectBackdrop)

    return (
        <div id="backdrop">
            <MaterialBackdrop className={classes.backdrop} open={isDisplayed}>
                <CircularProgress color="inherit" />
            </MaterialBackdrop>
        </div>
    )
}
