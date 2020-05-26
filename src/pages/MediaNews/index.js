import React from 'react'
import { useTranslation, Trans } from 'react-i18next'
import { MediaNewsTitle, MediaNewsStyled } from './MediaNews'
import data from './data'

import DefaultLayout from '../../layout/Default'

const MediaNews = () => {
    const { t } = useTranslation('media')

    return (
        <DefaultLayout title={`${t('page-title')} - Instant Visio`}>
            <MediaNewsTitle>On parle de nous</MediaNewsTitle>
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
                                    [Lire l'article]
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