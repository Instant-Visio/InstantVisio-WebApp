import React from 'react'
import { useTranslation } from 'react-i18next'
import ReactMarkdown from 'react-remarkable'
import markdown from '../../mdx/legal-mentions.md'

import DefaultLayout from '../../layout/Default'

const LegalMentions = () => {
    const {t} = useTranslation('legal-mentions')

    return (
        <DefaultLayout title={`${t('page-title')} - Instant Visio`}>
            <ReactMarkdown source={t('page-content')} />
        </DefaultLayout>
    )
}

export default LegalMentions