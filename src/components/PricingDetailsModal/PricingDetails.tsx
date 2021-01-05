import React from 'react'
import { useTranslation } from 'react-i18next'

export default function PricingDetails() {
    const { t } = useTranslation('pricing-details')

    return (
        <div>
            <h3>{t('information.packages')}</h3>
            <p>{t('information.1-credit')}</p>
            <p>{t('information.120mn')}</p>
            <h3>{t('information.exemples')}</h3>
            <img
                src="images/pricing-details/tableur.png"
                alt="tableur_pricing"
                width="100%"
            />
        </div>
    )
}
