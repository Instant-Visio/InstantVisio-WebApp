import React from 'react'
import {Link} from 'react-router-dom'
import FooterStyled from './Footer'
import { useTranslation } from 'react-i18next'

const Footer = () => {
    const {t} = useTranslation()
    return (
        <FooterStyled>
            <ul className="footer">
                <li className="footer-link">
                    <Link
                        to="/mentions-legales"
                        className="footer-link-content"
                    >
                        {t('footer.legal-mentions')}
                    </Link>
                </li>
                <li className="footer-link">
                    <Link
                        to="/donnees-personnelles"
                        className="footer-link-content"
                    >
                        {t('footer.personal-data')}
                    </Link>
                </li>
                <li className="footer-link">
                    <Link
                        to="/blog"
                        className="footer-link-content"
                    >
                        {t('footer.blog')}
                    </Link>
                </li>
                <li className="footer-link">
                    <Link
                        to="/credits"
                        className="footer-link-content"
                    >
                        {t('footer.credits')}
                    </Link>
                </li>
                <li className="footer-link">
                    <a
                        className="footer-link-content"
                        href="mailto:contact@instantvisio.com?Subject=Prise de contact"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {t('footer.contact-us')}
                    </a>
                </li>
            </ul>
        </FooterStyled>
    )
}

export default Footer
