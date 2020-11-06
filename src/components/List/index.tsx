import React from 'react'
import styled from 'styled-components'
import BaseListItem from './ListItem'
import PropTypes from 'prop-types'
import { SCREEN } from '../../styles/theme'

const ListItem = styled(BaseListItem)``

const Wrapper = styled.ol`
    list-style: none;
    counter-reset: my-awesome-counter;
    margin-bottom: 0;
    margin-block-end: 0;

    ${SCREEN.MOBILE} {
        padding: 0;
    }
    ${ListItem} {
        &:not(:last-child) {
            margin-bottom: ${({ theme }) => theme.spacing.M};
        }
    }
`

export default function List({ children, className }) {
    return (
        <Wrapper className={className}>
            {React.Children.map(children, (item, index) => (
                <ListItem key={`list-${index}`}>{item}</ListItem>
            ))}
        </Wrapper>
    )
}

List.propTypes = {
    className: PropTypes.string,
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.element])
        .isRequired,
}
