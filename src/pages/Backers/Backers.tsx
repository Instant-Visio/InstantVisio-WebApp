import React from 'react'
import { useTranslation, Trans } from 'react-i18next'
import { BackersTitle, BackersStyled } from './BackersStyled'
import data from './data'

import DefaultLayout from '../../layout/Default/Default'

const Backers = () => {
    const { t } = useTranslation('backers')

    return (
        <DefaultLayout title={`${t('page-title')} - Instant Visio`}>
            <BackersTitle>{t('page-title')}</BackersTitle>
            <BackersStyled>
                {data.map(({ id, url, logo, alt }) => (
                    <div key={id}>
                        <img src={logo} alt={alt} />
                        <p>
                            <Trans i18nKey="read-article">
                                <a
                                    href={url}
                                    target="_blank"
                                    rel="noopener noreferrer">
                                    {t('read-article')}
                                </a>
                            </Trans>
                        </p>
                    </div>
                ))}
            </BackersStyled>
        </DefaultLayout>
    )
}

export default Backers
