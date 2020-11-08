import React from 'react'
import styled from 'styled-components'

interface WrapperProps {
    readonly width: number
    readonly height: number
}

const Wrapper = styled.span<WrapperProps>`
    display: inline-block;
    width: ${({ width }) => width}px;
    height: ${({ height }) => height}px;
    border-top: 2px solid ${({ color, theme }) => color || theme.color.grey};
    border-left: 2px solid ${({ color, theme }) => color || theme.color.grey};
    transform: rotate(225deg);
`

export interface BaseArrowProps {
    readonly width?: number
    readonly height?: number
    className?: string
    color?: string
}

export default function Arrow({
    height = 12,
    width = 12,
    className,
    color,
}: BaseArrowProps) {
    return (
        <Wrapper
            width={width}
            height={height}
            className={className}
            color={color}
        />
    )
}
