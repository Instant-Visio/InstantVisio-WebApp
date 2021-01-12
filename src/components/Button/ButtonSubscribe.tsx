/**
 * This file was modified by
 * Nicolas Hovart <hovart.nicolas@gmail.com>
 */

import React from 'react'
import { Theme, withStyles } from '@material-ui/core/styles'

import { Button } from '@material-ui/core'

const PurpleButton = withStyles((theme: Theme) => ({
    root: {
        backgroundColor: '#6558f5',
        color: 'white',
        padding: '6px 14px',
        marginTop: theme.spacing(3),
        fontSize: '0.9rem',
        fontWeight: 'bolder',
        '&:hover': {
            backgroundColor: '#1c2dc1',
        },
        textTransform: 'none',
    },
}))(Button)

export default function ButtonEstimate(props: {
    onClick?: any
    title: string
    backgroundColor?: string
}) {
    // const classes = useStyles(props)

    return (
        <PurpleButton variant="contained" onClick={props.onClick}>
            {props.title}
        </PurpleButton>
    )
}
