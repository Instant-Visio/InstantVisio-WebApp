import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const Wrapper = styled.span`
    display: inline-block;
    width: ${({ width }) => width}px;
    height: ${({ height }) => height}px;
    border-top: 2px solid ${({ color, theme }) => color || theme.color.grey};
    border-left: 2px solid ${({ color, theme }) => color || theme.color.grey};
    transform: rotate(225deg);
`

export default function Arrow({ height, width, className, color }) {
    return (
        <Wrapper
            width={width}
            height={height}
            className={className}
            color={color}
        />
    )
}

Arrow.defaultProps = {
    width: 12,
    height: 12,
}

Arrow.propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    color: PropTypes.string,
    className: PropTypes.string,
}
