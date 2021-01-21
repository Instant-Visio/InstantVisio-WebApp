import React from 'react'

import { Button } from '@material-ui/core'
import styled from 'styled-components'

export interface CustomButtonProps {
    bgcolor?: string
    bgcolorhover?: string
}

const CustomButton = styled(Button)<CustomButtonProps>`
    background-color: ${(props) => props.bgcolor};
    color: white;
    padding: 6px 14px;
    margin-top: 24px;
    font-size: 0.9rem;
    font-weight: bolder;
    &:hover {
        background-color: ${(props) => props.bgcolorhover};
    }
    text-transform: none;
`

export default function InstantButton(props: {
    onClick?: any
    title: string
    bgColor?: string
    bgColorHover?: string
}) {
    return (
        <CustomButton
            variant="contained"
            onClick={props.onClick}
            bgcolor={props.bgColor}
            bgcolorhover={props.bgColorHover}>
            {props.title}
        </CustomButton>
    )
}
