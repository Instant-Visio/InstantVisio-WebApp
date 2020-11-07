import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.li`
    counter-increment: my-awesome-counter;

    &::before {
        content: counter(my-awesome-counter) '. ';
        font-weight: bold;
    }
`

interface ListItemProps {
    children: React.ReactNode | React.ReactElement
    className?: string
}

export default function ListItem({ children, className }: ListItemProps) {
    return <Wrapper className={className}>{children}</Wrapper>
}
