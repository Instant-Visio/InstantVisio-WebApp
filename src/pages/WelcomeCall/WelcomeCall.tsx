import React from 'react'
import { useTranslation } from 'react-i18next'
import { IonContent } from '@ionic/react'
import Button from '@material-ui/core/Button'
import styled from 'styled-components'
import PeopleOutline from '@material-ui/icons/PeopleOutline'

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

export default function WelcomeCall() {
    const { t } = useTranslation('welcome-call')

    return (
        <IonContent style={{ '--background': 'white' }}>
            <InformationBlock>
                <PeopleOutline fontSize="large" />
                <h2>
                    {t('join-visio')} "Test meeting" {t('of')} "Mr. Test"
                </h2>
                <h3>{t('verify-it-works')}</h3>
                <h3>{t('we-take-care')}</h3>

                <Button variant="contained" color="primary">
                    {t('click-to-start')}
                </Button>
            </InformationBlock>
        </IonContent>
    )
}
