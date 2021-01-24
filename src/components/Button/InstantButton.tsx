import React from 'react'

import { Button } from '@material-ui/core'
import styled from 'styled-components'

export interface CustomButtonProps {
    // Warning: React does not recognize the bgColor & bgColorHover props on a DOM element. See: "composite components should “consume” any prop that is intended for the composite component and not intended for the child component" https://reactjs.org/warnings/unknown-prop.html
    bgColor?: string
    bgColorHover?: string
}

const CustomButton = styled(Button)<CustomButtonProps>`
    background-color: ${(props) => props.bgColor};
    color: white;
    padding: 6px 14px;
    margin-top: 24px;
    font-size: 0.9rem;
    font-weight: bolder;
    &:hover {
        background-color: ${(props) => props.bgColorHover};
    }
    text-transform: none;
`

export default function InstantButton(
    props: {
        onClick?: () => void
        title: string
    } & CustomButtonProps
) {
    const { bgColor, bgColorHover, onClick, title } = props
    return (
        <CustomButton
            variant="contained"
            onClick={onClick}
            bgColor={bgColor}
            bgColorHover={bgColorHover}>
            {title}
        </CustomButton>
    )
}
