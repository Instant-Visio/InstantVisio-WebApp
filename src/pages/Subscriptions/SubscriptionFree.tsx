import React from 'react'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'
import { MainView } from './style'
import InstantButton from '../../components/Button/InstantButton'

export default function SubscriptionsFree() {
    const { t } = useTranslation('pricing') // NB: share the same .JSON than /Pricing
    const history = useHistory()

    return (
        <MainView>
            <div>
                <div className="infoContainer">
                    <h3>{t('free')}</h3>
                    <h5>{t('meeting1')}</h5>
                    <h5>{t('50-visios')}</h5>
                    {/* trick: to have same heights in all columns: */}
                    <div className="hidden">
                        <h5>hidden</h5>
                        <h5>hidden but with longer text</h5>
                        <InstantButton title="Text" />
                    </div>
                </div>
                <div className="listContainer listContainerFree">
                    <p>✔ {t('invitation-SMS-email')}</p>
                    <p>✔ {t('up-to-4')}</p>
                    <p>✔ {t('encrypted-calls')}</p>
                </div>
            </div>
            <div className="subscriptionButton">
                <InstantButton
                    title={t('support-us')}
                    onClick={() => history.push('/pricing')}
                    bgColor="#6558f5"
                    bgColorHover="#1c2dc1"
                />
            </div>
        </MainView>
    )
}
