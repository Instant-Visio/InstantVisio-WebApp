import React from 'react'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import { SCREEN } from '../../styles/theme'
import Button from '@material-ui/core/Button'
import { IonContent } from '@ionic/react'
import { withStyles } from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import PricingDetailsModal from '../../components/PricingDetailsModal/PricingDetailsModal'
import PricingDetails from '../../components/PricingDetailsModal/PricingDetails'

// consider use MaterialUi Grid to reduce the custom css https://material-ui.com/components/grid/
const ButtonSubscribe = withStyles({
    root: {
        background: '#6558f5',
        color: 'white',
        padding: '6px 14px',
        marginTop: '24px',
        fontSize: '0.9rem',
        fontWeight: 'bolder',
        alignSelf: 'center',
    },
    label: {
        textTransform: 'capitalize',
    },
})(Button)

const ButtonEstimate = withStyles({
    root: {
        background: '#1aae9f',
        color: 'white',
        padding: '6px 14px',
        fontSize: '0.9rem',
        fontWeight: 'bolder',
        marginTop: '1rem',
    },
    label: {
        textTransform: 'capitalize',
    },
})(Button)

const MainView = styled.div`
    h1 {
        font-size: ${({ theme }) => theme.spacing.L};
        text-align: center;
    }
`

const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    ${SCREEN.MOBILE} {
        flex-direction: column;
    }
`
const ColumnView = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 25%;
    padding: 2rem 2% 2rem 2%;
    min-width: 220px;
    background: ${({ theme }) => theme.color.white};
    border: 1px solid #c3cfd9;
    margin: ${({ theme }) => theme.spacing.XXL};

    h3 {
        margin-bottom: ${({ theme }) => theme.spacing.S};
    }

    .infoContainer > h5:nth-of-type(1) {
        height: 4rem;
        margin-bottom: ${({ theme }) => theme.spacing.XL};
    }
    p {
        margin-bottom: 0rem;
    }
    .infoContainer {
        // border: 1px solid #c3cfd9; // DEBUG
        text-align: center;
        margin-bottom: ${({ theme }) => theme.spacing.M};
    }
    .listContainer {
        // border: 1px solid #c3cfd9; // DEBUG
    }
    .hidden {
        visibility: hidden;
    }
    .listContainerFree {
        font-size: 1.1rem;
        margin-top: -3rem;
    }
    .subscriptionButton {
        text-decoration: none;
        text-align: center;
    }
    ${SCREEN.MOBILE} {
        flex-direction: column;
        padding: ${({ theme }) =>
            `${theme.spacing.XXL} 3rem ${theme.spacing.XXL} 3rem`};
        width: 80%;
        .hidden {
            display: none;
        }
        .listContainerFree {
            margin-top: 0rem;
        }
    }
    ${SCREEN.DESKTOP} {
        padding: ${({ theme }) =>
            `${theme.spacing.XXXL} 3rem ${theme.spacing.XXXL} 3rem`};
    }
`

export default function Subscriptions() {
    const { t } = useTranslation('pricing') // NB: share the same .JSON than /Pricing
    const history = useHistory()
    const [modalShow, setModalShow] = React.useState(false)

    return (
        <IonContent style={{ '--background': 'white' }}>
            <MainView>
                <h1>{t('ours-subscriptions')}</h1>
                <Wrapper>
                    {/* TODO:  move ColumnView different children into separate components, in order to make Subscriptions component lighter and easier to read */}
                    <ColumnView>
                        <div className="infoContainer">
                            <h3>{t('free')}</h3>
                            <h5>{t('meeting1')}</h5>
                            <h5>{t('50-visios')}</h5>
                            {/* trick: to have same heights in all columns: */}
                            <div className="hidden">
                                <h5>hidden</h5>
                                <h5>hidden but with longer text</h5>
                                <ButtonEstimate>hidden</ButtonEstimate>
                            </div>
                        </div>
                        <div className="listContainer listContainerFree">
                            {/* TODO: use more explicit names here instead */}
                            <p>✔ {t('invitation-SMS-email')}</p>
                            <p>✔ {t('up-to-4')}</p>
                            <p>✔ {t('encrypted-calls')}</p>
                        </div>
                        <ButtonSubscribe
                            onClick={() => history.push('/pricing')}>
                            {t('support-us')}
                        </ButtonSubscribe>
                    </ColumnView>
                    <ColumnView>
                        <div className="infoContainer">
                            <h3>{t('premium')}</h3>
                            <h5>{t('meeting2')}</h5>
                            <h5>{t('10K-credits-visio')}</h5>
                            <h5>{t('500-credits')}</h5>
                            <h5>{t('unlimited')}</h5>
                            <ButtonEstimate onClick={() => setModalShow(true)}>
                                {t('estimate-need')}
                            </ButtonEstimate>
                        </div>
                        <div className="listContainer">
                            {/* TODO: use a loop */}
                            <p>✔ {t('up-to-50')}</p>
                            <p>✔ {t('encrypted-calls-EU')}</p>
                            <p>✔ {t('sharescreen"')}</p>
                            <p>✔ {t('invitation-SMS-email-notifs')}</p>
                            <p>✔ {t('group-contact')}</p>
                            <p>✔ {t('reminder-SMS-email')}</p>
                            <p>✔ {t('API-instantvisio')}</p>
                        </div>
                        <a
                            className="subscriptionButton"
                            href="https://www.helloasso.com/associations/instant-visio/paiements/souscription-au-service-premium"
                            target="_blank"
                            rel="noopener noreferrer">
                            <ButtonSubscribe>
                                {t('subscription1')}
                            </ButtonSubscribe>
                        </a>
                    </ColumnView>
                    <ColumnView>
                        <div className="infoContainer">
                            <h3>{t('business')}</h3>
                            <h5>{t('meeting3')}</h5>
                            <h5>{t('60K-credits-visio')}</h5>
                            <h5>{t('3000-credits')}</h5>
                            <h5>{t('unlimited')}</h5>
                            <ButtonEstimate onClick={() => setModalShow(true)}>
                                {t('estimate-need')}
                            </ButtonEstimate>
                            <PricingDetailsModal
                                show={modalShow}
                                title={t('estimate-need')}
                                onHide={() => setModalShow(false)}>
                                <PricingDetails />
                            </PricingDetailsModal>
                        </div>
                        <div className="listContainer">
                            <p>✔ {t('up-to-50')}</p>
                            <p>✔ {t('encrypted-calls-EU')}</p>
                            <p>✔ {t('sharescreen"')}</p>
                            <p>✔ {t('invitation-SMS-email-notifs')}</p>
                            <p>✔ {t('group-contact')}</p>
                            <p>✔ {t('reminder-SMS-email')}</p>
                            <p>✔ {t('API-instantvisio')}</p>
                        </div>
                        <a
                            className="subscriptionButton"
                            href="https://www.helloasso.com/associations/instant-visio/paiements/compte-business?banner=True"
                            target="_blank"
                            rel="noopener noreferrer">
                            <ButtonSubscribe>
                                {t('subscription2')}
                            </ButtonSubscribe>
                        </a>
                    </ColumnView>
                </Wrapper>
            </MainView>
        </IonContent>
    )
}
