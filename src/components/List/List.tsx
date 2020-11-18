import React from 'react'
import styled from 'styled-components'
import BaseListItem from './ListItem'
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

interface BaseListProps {
    children: React.ReactNode | React.ReactElement
    className?: string
}
export default function List({ children, className }: BaseListProps) {
    return (
        <Wrapper className={className}>
            {React.Children.map(children, (item, index) => {
                const children = item
                return <ListItem key={`list-${index}`}>{children}</ListItem>
            })}
        </Wrapper>
    )
}
