import React from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { Modal as MaterialModal } from '@material-ui/core'

function getModalStyle() {
    const top = 50
    const left = 50

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    }
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        paper: {
            position: 'absolute',
            width: 400,
            backgroundColor: theme.palette.background.paper,
            border: '2px solid #000',
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
            overflowY: 'auto',
            maxHeight: '100vh',
            height: 'fit-content',
        }
    })
)

export default function Modal({ isOpened, children, onClose }) {
    const classes = useStyles()
    const [modalStyle] = React.useState(getModalStyle)

    const body = (
        <div style={modalStyle} className={classes.paper}>
            {children}
        </div>
    )

    return (
        <div>
            <MaterialModal
                open={isOpened}
                onClose={onClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description">
                {body}
            </MaterialModal>
        </div>
    )
}
