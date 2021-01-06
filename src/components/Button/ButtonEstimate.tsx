/**
 * This file was modified by
 * Nicolas Hovart <hovart.nicolasa@gmail.com>
 */

import React from 'react'
import { Theme, withStyles } from '@material-ui/core/styles'

import { Button } from '@material-ui/core'
import { lightGreen } from '@material-ui/core/colors'

// TODO: find correct color '#1aae9f' in @material-ui/core/colors

const GreenButton = withStyles((theme: Theme) => ({
    root: {
        color: 'white',
        backgroundColor: '#1aae9f',
        padding: '6px 14px',
        marginTop: theme.spacing(3),
        fontSize: '0.9rem',
        fontWeight: 'bolder',
        '&:hover': {
            backgroundColor: lightGreen[700],
        },
    },
}))(Button)

export default function ButtonEstimate(props: { onClick?: any; title: any }) {
    return (
        <GreenButton
            variant="contained"
            color="primary"
            onClick={props.onClick}>
            {props.title}
        </GreenButton>
    )
}
