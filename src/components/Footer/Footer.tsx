import React from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import About from '../../documents/Instant_Visio_Keynote.pdf'
import FooterStyled from './FooterStyled'
import { showPreferencesDialog } from '../../utils/gdpr'
import { showModal } from '../Modal/modalAction'

const Footer = () => {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const showNewsletterModal = () => dispatch(showModal('Newsletter'))

    return (
        <FooterStyled>
            <ul className="footer">
                <li className="footer-link">
                    <Link
                        to={About}
                        className="footer-link-content"
                        target="_blank"
                        rel="noopener noreferrer">
                        {t('footer.about')}
                    </Link>
                </li>
                <li className="footer-link">
                    <Link
                        to={`/${t('url.legal-mentions')}`}
                        className="footer-link-content">
                        {t('footer.legal-mentions')}
                    </Link>
                </li>
                <li className="footer-link">
                    <Link
                        to={`/${t('url.personal-data')}`}
                        className="footer-link-content">
                        {t('footer.personal-data')}
                    </Link>
                </li>
                <li className="footer-link">
                    <Link
                        to={`/${t('url.blog')}`}
                        className="footer-link-content">
                        {t('footer.blog')}
                    </Link>
                </li>
                <li className="footer-link">
                    <Link
                        to={`/${t('url.credits')}`}
                        className="footer-link-content">
                        {t('footer.credits')}
                    </Link>
                </li>
                <li className="footer-link">
                    <Link
                        to={`/${t('url.backers')}`}
                        className="footer-link-content">
                        {t('footer.backers')}
                    </Link>
                </li>
                <li className="footer-link">
                    <Link
                        to={`/${t('url.media')}`}
                        className="footer-link-content">
                        {t('footer.media')}
                    </Link>
                </li>
                <li className="footer-link">
                    <button
                        className="footer-link-content"
                        onClick={showNewsletterModal}>
                        {t('footer.newsletter')}
                    </button>
                </li>
                <li className="footer-link">
                    <a
                        className="footer-link-content"
                        href={`mailto:contact@instantvisio.com?Subject=${t(
                            'footer.contact'
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer">
                        {t('footer.contact-us')}
                    </a>
                </li>
                <li className="footer-link">
                    <button
                        className="footer-link-content"
                        onClick={showPreferencesDialog}>
                        {t('footer.cookies')}
                    </button>
                </li>
                <li className="footer-link">
                    <Link
                        to={`/${t('url.license')}`}
                        className="footer-link-content">
                        {t('footer.license')}
                    </Link>
                </li>
            </ul>
        </FooterStyled>
    )
}

export default Footer
