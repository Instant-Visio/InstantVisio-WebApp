import React from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import homeLogo from '../../styles/assets/images/homeLogo.svg'
import logo from '../../styles/assets/images/logo.svg'
import logoMobile from '../../styles/assets/images/logo_mobile.svg'
import useDetectMobileOrTablet from '../../hooks/useDetectMobileOrTablet'

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
