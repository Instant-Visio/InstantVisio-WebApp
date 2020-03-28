import React from 'react'
import { useTranslation } from 'react-i18next'
import logo from '../../styles/assets/images/logo.svg'
import logoMobile from '../../styles/assets/images/logo_mobile.svg'
import useDetectMobile from '../../hooks/useDetectMobile'


export default function Logo(){
    const {t} = useTranslation()
    const isMobile = useDetectMobile()
    return (<img src={isMobile ? logoMobile : logo} alt={t('logo.alt')} />)
}