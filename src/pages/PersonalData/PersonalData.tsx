import React from 'react'
import { useTranslation } from 'react-i18next'
import ReactMarkdown from 'react-remarkable'

import DefaultLayout from '../../layout/Default/Default'
import { IonContent } from '@ionic/react'

const PersonalData = () => {
    const { t } = useTranslation('personal-data')

    return (
        <>
            <IonContent>
                <DefaultLayout title={`${t('page-title')} - Instant Visio`}>
                    <ReactMarkdown source={t('page-content')} />
                </DefaultLayout>
            </IonContent>
        </>
    )
}

export default PersonalData
