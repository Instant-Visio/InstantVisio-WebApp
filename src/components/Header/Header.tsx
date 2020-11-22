import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container } from 'react-bootstrap'
import { HeaderStyled, HeaderLogoBaseline } from './HeaderStyled'
import { useTranslation } from 'react-i18next'
import Logo from 'src/components/Logo/Logo'
import useDetectMobileOrTablet from 'src/hooks/useDetectMobileOrTablet'

const Header = () => {
    const { t } = useTranslation()
    const isMobile = useDetectMobileOrTablet()

    return (
        <HeaderStyled>
            <Container className="header">
                <HeaderLogoBaseline>
                    {!isMobile && <Logo />}
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
