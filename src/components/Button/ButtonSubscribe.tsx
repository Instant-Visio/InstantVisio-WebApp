/**
 * This file was modified by
 * Nicolas Hovart <hovart.nicolasa@gmail.com>
 */

import React from 'react'
import {
    createStyles,
    makeStyles,
    Theme,
    withStyles,
} from '@material-ui/core/styles'

import { Button } from '@material-ui/core'
import { purple } from '@material-ui/core/colors'

// TODO: find correct color '#6558f5' in @material-ui/core/colors

const PurpleButton = withStyles((theme: Theme) => ({
    root: {
        backgroundColor: '#6558f5',
        color: 'white',
        padding: '6px 14px',
        marginTop: '24px',
        fontSize: '0.9rem',
        fontWeight: 'bolder',
        '&:hover': {
            backgroundColor: purple[700],
        },
    },
}))(Button)

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        margin: {
            margin: theme.spacing(1),
        },
    })
)

export default function ButtonEstimate(props: { onClick?: any; title: any }) {
    const classes = useStyles()

    return (
        <PurpleButton
            variant="contained"
            color="primary"
            className={classes.margin}
            onClick={props.onClick}>
            {props.title}
        </PurpleButton>
    )
}
