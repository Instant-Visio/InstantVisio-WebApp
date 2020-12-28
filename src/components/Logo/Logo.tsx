import React from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import defaultLogo from '../../styles/assets/images/logo.svg'
import mobileLogo from '../../styles/assets/images/logo_mobile.svg'
import { isAndroid, isIos } from '../../services/platform'
import styled from 'styled-components'

const Img = styled.img`
    width: 100%;
`

const StyledLink = styled(Link)`
    width: 100px;
    display: block;
    @media screen and (min-width: 1024px) {
        width: 181px;
        height: 66px;
    }
`

function Logo() {
    const { t } = useTranslation()
    const isMobile = isIos() || isAndroid()
    let logo = mobileLogo

    if (!isMobile) {
        logo = defaultLogo
    }

    return (
        <StyledLink to="/">
            <Img src={logo} alt={t('logo.alt')} />
        </StyledLink>
    )
}

export default React.memo(Logo)
