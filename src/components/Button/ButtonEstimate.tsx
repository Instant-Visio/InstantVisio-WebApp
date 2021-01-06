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
import { lightGreen } from '@material-ui/core/colors'

// TODO: find correct color '#1aae9f' in @material-ui/core/colors

const GreenButton = withStyles((theme: Theme) => ({
    root: {
        color: 'white',
        backgroundColor: '#1aae9f',
        padding: '6px 14px',
        marginTop: '24px',
        fontSize: '0.9rem',
        fontWeight: 'bolder',
        '&:hover': {
            backgroundColor: lightGreen[700],
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
        <GreenButton
            variant="contained"
            color="primary"
            className={classes.margin}
            onClick={props.onClick}>
            {props.title}
        </GreenButton>
    )
}
