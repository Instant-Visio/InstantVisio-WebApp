import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import {Container} from 'react-bootstrap'
import HeaderStyled from './Header.styled.js'
import Logo from '../Logo'


const Header = () => (
    <HeaderStyled>
        <Container className="header">
            <Logo />
            <Container className="header-baseline">
                <p className="header-baseline-content">Joignez un proche en visio, en un clic, gratuitement.</p>
            </Container>
        </Container>
    </HeaderStyled>
)

export default Header