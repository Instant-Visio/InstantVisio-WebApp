import React from 'react'
import { IonContent } from '@ionic/react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { Button } from '@material-ui/core'
import { useHistory } from 'react-router-dom'

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
    const history = useHistory()
    const startPremiumVideoCall = () => {
        history.push('/premium-video/room/testRoom?passcode=admin')
    }

    return (
        <IonContent style={{ '--background': 'white' }}>
            <InformationBlock>
                {t('dashboard.welcome')}
                <Button onClick={() => startPremiumVideoCall()}>
                    Start Call
                </Button>
            </InformationBlock>
        </IonContent>
    )
}
