/**
 * This file was modified by
 * Nicolas Hovart <hovart.nicolasa@gmail.com>
 */

import React from 'react'
import { Theme, withStyles } from '@material-ui/core/styles'

import { Button } from '@material-ui/core'
import { purple } from '@material-ui/core/colors'

// TODO: find correct color '#6558f5' in @material-ui/core/colors

const PurpleButton = withStyles((theme: Theme) => ({
    root: {
        backgroundColor: '#6558f5',
        color: 'white',
        padding: '6px 14px',
        marginTop: theme.spacing(3),
        fontSize: '0.9rem',
        fontWeight: 'bolder',
        alignSelf: 'center',
        '&:hover': {
            backgroundColor: purple[700],
        },
    },
}))(Button)

export default function ButtonEstimate(props: { onClick?: any; title: any }) {
    return (
        <PurpleButton
            variant="contained"
            color="primary"
            onClick={props.onClick}>
            {props.title}
        </PurpleButton>
    )
}
