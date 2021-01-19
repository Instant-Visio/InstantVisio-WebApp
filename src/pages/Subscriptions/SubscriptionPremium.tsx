import React from 'react'
import ButtonEstimate from '../../components/Button/ButtonEstimate'
import ButtonSubscribe from '../../components/Button/ButtonSubscribe'
import { useTranslation } from 'react-i18next'
import { MainView } from './style'
import packagePricing from '../../data/js/packagePricing'
import { showModal } from '../../components/Modal/modalAction'
import { useDispatch } from 'react-redux'

export default function SubscriptionPremium() {
    const { t } = useTranslation('pricing')
    const dispatch = useDispatch()

    return (
        <MainView>
            <div className="infoContainer">
                <h3>{t('premium')}</h3>
                <h5>{t('meeting2')}</h5>
                <h5>{t('10K-credits-visio')}</h5>
                <h5>{t('500-credits')}</h5>
                <h5>{t('unlimited')}</h5>
                <ButtonEstimate
                    onClick={() => dispatch(showModal('PricingTable'))}
                    title={t('estimate-need')}
                />
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
