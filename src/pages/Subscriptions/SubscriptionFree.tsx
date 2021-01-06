import React from 'react'
import ButtonSubscribe from '../../components/Button/ButtonSubscribe'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'

export default function SubscriptionsFree() {
    const { t } = useTranslation('pricing') // NB: share the same .JSON than /Pricing
    const history = useHistory()

    return (
        <>
            <div className="infoContainer">
                <h3>{t('free')}</h3>
                <h5>{t('meeting1')}</h5>
                <h5>{t('50-visios')}</h5>
                {/* trick: to have same heights in all columns: */}
                <div className="hidden">
                    <h5>hidden</h5>
                    <h5>hidden but with longer text</h5>
                    <ButtonSubscribe title="" />
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
        </>
    )
}
