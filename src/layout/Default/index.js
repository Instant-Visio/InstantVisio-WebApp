import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'

const Body = styled.div``

export default function Default({children}){
    return (
        <>
            <Header />
            <Body>
                {children}
            </Body>
            <Footer />
        </>
    )
}

Default.propTypes = {
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.element]).isRequired,
    className: PropTypes.string
}