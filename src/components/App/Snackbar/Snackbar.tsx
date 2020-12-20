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
    const { snackbar } = useSelector(selectSnackbar)
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
                open={snackbar.isDisplayed}
                autoHideDuration={3000}
                onClose={handleClose}>
                {snackbar.isError ? (
                    <Alert onClose={handleClose} severity="error">
                        error
                    </Alert>
                ) : (
                    <Alert onClose={handleClose} severity="success">
                        success message hey
                    </Alert>
                )}
            </MaterialSnackbar>
        </div>
    )
}
