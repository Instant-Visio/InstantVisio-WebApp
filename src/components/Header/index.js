import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container } from 'react-bootstrap'
import { HeaderStyled, HeaderLogoBaseline } from './Header'
import { useTranslation } from 'react-i18next'
import Logo from '../Logo'

const Header = () => {
    const { t } = useTranslation()

    return (
        <HeaderStyled>
            <Container className="header">
                <HeaderLogoBaseline>
                    <Logo />
                    <Container className="header-baseline">
                        <p className="header-baseline-content">
                            {t('headerBaseline')}
                        </p>
                    </Container>
                </HeaderLogoBaseline>
            </Container>
        </HeaderStyled>
    )
}

export default React.memo(Header)
