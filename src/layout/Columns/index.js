import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import useDocumentTitle from '../../hooks/useDocumentTitle'
import {SCREEN} from '../../styles/theme'
import Footer from '../../components/Footer'

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    ${SCREEN.DESKTOP} {
        flex-direction: row;
    }
`

const Left = styled.div`
    padding: ${({theme}) => theme.spacing.L};
    width: 100%;
    background: ${({theme}) => theme.color.white};
    ${SCREEN.DESKTOP} {
        padding: ${({theme}) => `${theme.spacing.XXXL} ${theme.spacing.M} ${theme.spacing.XXXL} ${theme.spacing.M}`};
        width: 55%;
    }
`

const Right = styled.div`
    display: flex; 
    flex-direction: column;
    justify-content: center;
    background: ${({theme}) => theme.color.grey};
    width: 100%;
    padding: ${({theme}) => theme.spacing.M};
    ${SCREEN.DESKTOP} {
        width: 45%;
        padding: 7rem;
    }
`

export default function Columns({children, title}){
    useDocumentTitle(title)
    const [first, ...second] = React.Children.toArray(children)
    return (
        <>
            <Wrapper>
                <Left>{first}</Left>
                <Right>{second}</Right>
            </Wrapper>
            <Footer />
        </>
    )
}

Columns.propTypes = {
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.element]).isRequired,
    title: PropTypes.string.isRequired
}