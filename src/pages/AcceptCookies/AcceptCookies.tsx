import React from 'react'
import { useTranslation } from 'react-i18next'
import { IonContent } from '@ionic/react'
import Button from '@material-ui/core/Button'
import styled from 'styled-components'
import GroupWorkOutlinedIcon from '@material-ui/icons/GroupWorkOutlined'

const InformationBlock = styled.div`
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    flex-direction: column;
    width: 80%;
    margin-left: 10%;

    h1 {
        font-weight: 'bold';
    }

    h6:nth-of-type(2) {
        margin-bottom: 2rem;
    }
`

export default function AcceptCookies() {
    const { t } = useTranslation('accept-cookies')

    return (
        <IonContent style={{ '--background': 'white' }}>
            <InformationBlock>
                {/* Find a better Icon - didn't find cookies in Mui */}
                <GroupWorkOutlinedIcon fontSize="large" />
                <h1>{t('info-message')}</h1>
                <h6>{t('data-to-connect')}</h6>
                <h6>{t('just-one-day')}</h6>

                <Button variant="contained" color="primary">
                    {t('accept-cookies')}
                </Button>
            </InformationBlock>
        </IonContent>
    )
}
