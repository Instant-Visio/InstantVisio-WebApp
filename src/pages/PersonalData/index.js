import React from 'react'
import { useTranslation } from 'react-i18next'
import ReactMarkdown from 'react-remarkable'

import DefaultLayout from '../../layout/Default'

const PersonalData = () => {
    const {t} = useTranslation('personal-data')

    return (
        <>
            <DefaultLayout title={`${t('page-title')} - Instant Visio`}>
                <ReactMarkdown source={t('page-content')} />
            </DefaultLayout>
        </>
    )
}

export default PersonalData