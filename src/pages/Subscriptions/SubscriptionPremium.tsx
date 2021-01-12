import React from 'react'
import ButtonEstimate from '../../components/Button/ButtonEstimate'
import ButtonSubscribe from '../../components/Button/ButtonSubscribe'
import PricingDetailsModal from '../../components/PricingDetailsModal/PricingDetailsModal'
import PricingDetails from '../../components/PricingDetailsModal/PricingDetails'
import { useTranslation } from 'react-i18next'
import { MainView } from './style'
import packagePricing from '../../data/js/packagePricing'

export default function SubscriptionPremium() {
    const { t } = useTranslation('pricing')
    const [modalShow, setModalShow] = React.useState(false)

    return (
        <MainView>
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
                <PricingDetailsModal
                    show={modalShow}
                    title={t('how-to')}
                    onHide={() => setModalShow(false)}>
                    <PricingDetails />
                </PricingDetailsModal>
            </div>
            <div className="listContainer">
                {packagePricing.list.map((item, index) => (
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
        </MainView>
    )
}
