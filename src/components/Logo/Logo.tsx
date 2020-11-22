import React from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import homeLogo from 'src/styles/assets/images/homeLogo.svg'
import logo from 'src/styles/assets/images/logo.svg'
import logoMobile from 'src/styles/assets/images/logo_mobile.svg'
import useDetectMobileOrTablet from 'src/hooks/useDetectMobileOrTablet'

function Logo() {
    const { t } = useTranslation()
    const isMobile = useDetectMobileOrTablet()
    let logoToChoose = ''

    if (isMobile) {
        logoToChoose = logoMobile
    } else if (window.location.pathname === '/' && !isMobile) {
        logoToChoose = homeLogo
    } else if (window.location.pathname !== '/' && !isMobile) {
        logoToChoose = logo
    }

    return (
        <Link to="/" className="logo-link">
            <img
                src={logoToChoose}
                alt={t('logo.alt')}
                className="logo-picture"
            />
        </Link>
    )
}

export default React.memo(Logo)
