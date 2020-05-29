import React from 'react'
import { useTranslation } from 'react-i18next'
import ReactMarkdown from 'react-remarkable'
import styled from 'styled-components'
import DefaultLayout from '../../layout/Default'
import useDetectMobileOrTablet from '../../hooks/useDetectMobileOrTablet'

const MarkdownContainer = styled.div`
    h2 {
        font-size: ${({ theme }) => theme.font.XL};
    }
    h3 {
        font-size: ${({ theme }) => theme.font.L};
    }
`

const LegalMentions = () => {
    const { t } = useTranslation('legal-mentions')
    const isMobile = useDetectMobileOrTablet()

    return (
        <DefaultLayout title={`${t('page-title')} - Instant Visio`}>
            {isMobile ? (
                <MarkdownContainer>
                    <ReactMarkdown source={t('page-content')} />
                </MarkdownContainer>
            ) : (
                <ReactMarkdown source={t('page-content')} />
            )}
        </DefaultLayout>
    )
}

export default LegalMentions
