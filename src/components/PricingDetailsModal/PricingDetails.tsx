import React from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

// const StyledIframe = styled.div`
//     img {
//         border: 1px solid #c3cfd9;
//     }
// `

export default function PricingDetails() {
    const { t } = useTranslation('pricing-details')

    return (
        <div>
            <h3>{t('information.packages')}</h3>
            <p>{t('information.1-credit')}</p>
            <h3>{t('information.exemples')}</h3>
            <img
                src={'../../src/styles/assets/images/pricing/tableur.png'}
                alt="tableur_pricing"
                width="80%"
                height="10rem"
            />
        </div>
    )
}
