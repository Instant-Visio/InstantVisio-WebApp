import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const Wrapper = styled.li`
    counter-increment: my-awesome-counter;

    &::before {
        content: counter(my-awesome-counter) '. ';
        font-weight: bold;
    }
`
export default function ListItem({ children, className }) {
    return <Wrapper className={className}>{children}</Wrapper>
}

ListItem.propTypes = {
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.element])
        .isRequired,
    className: PropTypes.string,
}
