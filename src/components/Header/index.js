import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import {Container} from 'react-bootstrap'
import HeaderStyled from './Header.js/index.js'
import { useTranslation } from 'react-i18next'
import Logo from '../Logo'


const Header = () => {
    const {t} = useTranslation()
        return (
        <HeaderStyled>
            <Container className="header">
                <Logo />
                <Container className="header-baseline">
                    <p className="header-baseline-content">{t('baseline')}</p>
                </Container>
            </Container>
        </HeaderStyled>
    )
}

export default Header