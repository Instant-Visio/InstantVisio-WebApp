import React from 'react'
import { useTranslation } from 'react-i18next'
import { IonContent } from '@ionic/react'
import Button from '@material-ui/core/Button'
import styled from 'styled-components'
import AccessTimeIcon from '@material-ui/icons/AccessTime'

const InformationBlock = styled.div`
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    flex-direction: column;
    width: 80%;
    margin-left: 10%;

    h2 {
        font-weight: 'bold';
    }

    h3:nth-of-type(2) {
        margin-top: 2rem;
        margin-bottom: 2rem;
    }
`

export default function CallNotLaunched() {
    const { t } = useTranslation('call-not-launched')

    return (
        <IonContent style={{ '--background': 'white' }}>
            <InformationBlock>
                <AccessTimeIcon fontSize="large" />
                <h2>{t('discussion-is-not-launched')}</h2>
                <h3>{t('takes-places-at')}</h3>
                <h3>{t('too-early')}</h3>
                <h4>{t('enjoy')}</h4>
                <Button>{t('discover-join')}</Button>
                <Button>{t('discover-create')}</Button>
                <Button>{t('discover-us')}</Button>
            </InformationBlock>
        </IonContent>
    )
}
