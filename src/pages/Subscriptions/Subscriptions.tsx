import React from 'react'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
// import { SCREEN } from '../../styles/theme'
import { IonContent } from '@ionic/react'
import { Grid } from '@material-ui/core'
import SubscriptionFree from './SubscriptionFree'
import SubscriptionBusiness from './SubscriptionBusiness'
import SubscriptionPremium from './SubscriptionPremium'

const MainView = styled.div`
    h1 {
        font-size: ${({ theme }) => theme.spacing.L};
        text-align: center;
    }
`

export default function Subscriptions() {
    const { t } = useTranslation('pricing')

    return (
        <IonContent style={{ '--background': 'white' }}>
            <MainView>
                <h1>{t('ours-subscriptions')}</h1>
                <Grid container spacing={0} justify="center">
                    <Grid item sm>
                        <SubscriptionFree />
                    </Grid>
                    <Grid item sm>
                        <SubscriptionPremium />
                    </Grid>
                    <Grid item sm>
                        <SubscriptionBusiness />
                    </Grid>
                </Grid>
            </MainView>
        </IonContent>
    )
}
