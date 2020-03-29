import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import ReactMarkdown from 'react-markdown'
import markdown from '../../mdx/legal-mentions.md'

import DefaultLayout from '../../layout/Default'

const LegalMentions = () => {
    const [ content, setContent ] = useState(null)

    useEffect(() => {
        fetch(markdown).then(res => res.text()).then(text => setContent(text))
    })

    const {t} = useTranslation('legal-mentions')

    return (
        <DefaultLayout title={`${t('page-title')} - Instant Visio`}>
            <ReactMarkdown source={content} t={t} />
        </DefaultLayout>
    )
}

export default LegalMentions