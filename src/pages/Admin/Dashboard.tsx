import React from 'react'
import { IonContent } from '@ionic/react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

const InformationBlock = styled.div`
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    flex-direction: column;
    width: 80%;
    margin-left: 10%;
`

export default function Dashboard() {
    const { t } = useTranslation('admin')

    return (
        <IonContent style={{ '--background': 'white' }}>
            <InformationBlock>{t('dashboard.welcome')}</InformationBlock>
        </IonContent>
    )
}
