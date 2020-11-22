import React from 'react'
import { useTranslation, Trans } from 'react-i18next'
import { MediaNewsTitle, MediaNewsStyled } from './MediaNewsStyled'
import data from './data'

import DefaultLayout from 'src/layout/Default/Default'

const MediaNews = () => {
    const { t } = useTranslation('media')

    return (
        <DefaultLayout title={`${t('page-title')} - Instant Visio`}>
            <MediaNewsTitle>{t('page-title')}</MediaNewsTitle>
            <MediaNewsStyled>
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
            </MediaNewsStyled>
        </DefaultLayout>
    )
}

export default MediaNews
