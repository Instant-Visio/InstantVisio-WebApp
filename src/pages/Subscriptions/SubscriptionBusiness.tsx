import React from 'react'
import InstantButton from '../../components/Button/InstantButton'
import { useTranslation } from 'react-i18next'
import { MainView } from './style'
import packagePricing from '../../data/js/packagePricing'
import { showModal } from '../../components/Modal/modalAction'
import { useDispatch } from 'react-redux'

export default function SubscriptionBusiness() {
    const { t } = useTranslation('pricing')
    const dispatch = useDispatch()

    return (
        <MainView>
            <div className="infoContainer">
                <h3>{t('business')}</h3>
                <h5>{t('meeting3')}</h5>
                <h5>{t('60K-credits-visio')}</h5>
                <h5>{t('3000-credits')}</h5>
                <h5>{t('unlimited')}</h5>
                <InstantButton
                    title={t('estimate-need')}
                    onClick={() => dispatch(showModal('PricingTable'))}
                    bgColor="#1aae9f"
                    bgColorHover="#60e0d0"
                />
            </div>
            <div className="listContainer">
                {packagePricing.list.map((item, index) => (
                    <p key={index}>✔ {t(item)}</p>
                ))}
            </div>
            <a
                className="subscriptionButton"
                href="https://www.helloasso.com/associations/instant-visio/paiements/compte-business?banner=True"
                target="_blank"
                rel="noopener noreferrer">
                <InstantButton
                    title={t('subscription2')}
                    bgColor="#6558f5"
                    bgColorHover="#1c2dc1"
                />
            </a>
        </MainView>
    )
}
