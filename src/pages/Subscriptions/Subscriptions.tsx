import React from 'react'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
// import { SCREEN } from '../../styles/theme'
import { IonContent } from '@ionic/react'
import { Grid } from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import PricingDetailsModal from '../../components/PricingDetailsModal/PricingDetailsModal'
import PricingDetails from '../../components/PricingDetailsModal/PricingDetails'
import ButtonEstimate from '../../components/Button/ButtonEstimate'
import ButtonSubscribe from '../../components/Button/ButtonSubscribe'

const MainView = styled.div`
    h1 {
        font-size: ${({ theme }) => theme.spacing.L};
        text-align: center;
    }
`

const listPackage = [
    'up-to-50',
    'encrypted-calls-EU',
    'sharescreen"',
    'invitation-SMS-email-notifs',
    'group-contact',
    'reminder-SMS-email',
    'API-instantvisio',
]

export default function Subscriptions() {
    const { t } = useTranslation('pricing') // NB: share the same .JSON than /Pricing
    const history = useHistory()
    const [modalShow, setModalShow] = React.useState(false)

    return (
        <IonContent style={{ '--background': 'white' }}>
            <MainView>
                <h1>{t('ours-subscriptions')}</h1>
                <Grid container>
                    <Grid item lg>
                        <div className="infoContainer">
                            <h3>{t('free')}</h3>
                            <h5>{t('meeting1')}</h5>
                            <h5>{t('50-visios')}</h5>
                            {/* trick: to have same heights in all columns: */}
                            <div className="hidden">
                                <h5>hidden</h5>
                                <h5>hidden but with longer text</h5>
                                <ButtonEstimate title="" />
                            </div>
                        </div>
                        <div className="listContainer listContainerFree">
                            <p>✔ {t('invitation-SMS-email')}</p>
                            <p>✔ {t('up-to-4')}</p>
                            <p>✔ {t('encrypted-calls')}</p>
                        </div>
                        <ButtonSubscribe
                            onClick={() => history.push('/pricing')}
                            title={t('support-us')}
                        />
                    </Grid>
                    <Grid item lg>
                        <div className="infoContainer">
                            <h3>{t('premium')}</h3>
                            <h5>{t('meeting2')}</h5>
                            <h5>{t('10K-credits-visio')}</h5>
                            <h5>{t('500-credits')}</h5>
                            <h5>{t('unlimited')}</h5>
                            <ButtonEstimate
                                onClick={() => setModalShow(true)}
                                title={t('estimate-need')}
                            />
                        </div>
                        <div className="listContainer">
                            {listPackage.map((item, index) => (
                                <p key={index}>✔ {t(item)}</p>
                            ))}
                        </div>
                        <a
                            className="subscriptionButton"
                            href="https://www.helloasso.com/associations/instant-visio/paiements/souscription-au-service-premium"
                            target="_blank"
                            rel="noopener noreferrer">
                            <ButtonSubscribe title={t('subscription1')} />
                        </a>
                    </Grid>
                    <Grid item lg>
                        <div className="infoContainer">
                            <h3>{t('business')}</h3>
                            <h5>{t('meeting3')}</h5>
                            <h5>{t('60K-credits-visio')}</h5>
                            <h5>{t('3000-credits')}</h5>
                            <h5>{t('unlimited')}</h5>
                            <ButtonEstimate
                                onClick={() => setModalShow(true)}
                                title={t('estimate-need')}
                            />
                            <PricingDetailsModal
                                show={modalShow}
                                title={t('how-to')}
                                onHide={() => setModalShow(false)}>
                                <PricingDetails />
                            </PricingDetailsModal>
                        </div>
                        <div className="listContainer">
                            {listPackage.map((item, index) => (
                                <p key={index}>✔ {t(item)}</p>
                            ))}
                        </div>
                        <a
                            className="subscriptionButton"
                            href="https://www.helloasso.com/associations/instant-visio/paiements/compte-business?banner=True"
                            target="_blank"
                            rel="noopener noreferrer">
                            <ButtonSubscribe title={t('subscription2')} />
                        </a>
                    </Grid>
                </Grid>
            </MainView>
        </IonContent>
    )
}
