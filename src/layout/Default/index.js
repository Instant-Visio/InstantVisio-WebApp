import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {SCREEN} from '../../styles/theme'
import useDocumentTitle from '../../hooks/useDocumentTitle'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import BaseLang from '../../components/Lang'

const Lang = styled(BaseLang)`
    position: absolute;
    right: 20px;
    top: 10px;
    z-index: 1;
`

const Wrapper = styled.div`
    position: relative;
    ${SCREEN.MOBILE} {
        & .header{
            padding-top: 4rem;
        }
    }
`

const Body = styled.div`
    width: 100%;
`

const Container = styled.div`
    background: ${({theme}) => theme.color.white};
    border-radius: ${({theme}) => theme.spacing.XS};
    min-height: 60vh;
    color: ${({theme}) => theme.color.grey};
    
    h2 {
        font-size: ${({theme}) => theme.font.XXL};
        margin-bottom: ${({theme}) => theme.spacing.XXL};   
    }

    h3 {
        margin-top: ${({theme}) => theme.spacing.XXL}
    }

    p, a, strong {
        color: ${({theme}) => theme.color.grey};
    }

    a {
        text-decoration: underline
    }

    p, label {
        font-size: ${({theme}) =>theme.font.M};
        color: ${({theme}) =>theme.color.textGrey};
    }

    ${SCREEN.MOBILE_AND_TABLET} {
        margin: ${({theme}) => theme.spacing.XXL};
        padding: ${({theme}) => theme.spacing.XXL};
    }

    ${SCREEN.DESKTOP} {
        margin: ${({theme}) => theme.spacing.XXXL};
        padding: ${({theme}) => theme.spacing.XXXL};
    }
    
`

export default function Default({children, title}){
    useDocumentTitle(title)

    return (
        <Wrapper>
            <Lang />
            <Header />
            <Body>
                <Container>
                    {children}
                </Container>
            </Body>
            <Footer />
        </Wrapper>
    )
}

Default.propTypes = {
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.element]).isRequired,
    className: PropTypes.string,
    title: PropTypes.string.isRequired
}