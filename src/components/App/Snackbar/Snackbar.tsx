import React from 'react'
import { Snackbar as MaterialSnackbar } from '@material-ui/core'
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { useSelector, useDispatch } from 'react-redux'
import { selectSnackbar } from './snackbarSelector'
import { hideMessage } from './snackbarActions'

function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />
}

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
}))

export default function Snackbar() {
    const classes = useStyles()
    const { isDisplayed, message, isError } = useSelector(selectSnackbar)
    const dispatch = useDispatch()

    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return
        }

        dispatch(hideMessage())
    }

    return (
        <div id="snackbar" className={classes.root}>
            <MaterialSnackbar
                open={isDisplayed}
                autoHideDuration={3000}
                onClose={handleClose}>
                {isError ? (
                    <Alert onClose={handleClose} severity="error">
                        {message}
                    </Alert>
                ) : (
                    <Alert onClose={handleClose} severity="success">
                        {message}
                    </Alert>
                )}
            </MaterialSnackbar>
        </div>
    )
}
