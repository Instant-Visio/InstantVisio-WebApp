import React from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

const StyledIframe = styled.div`
    img {
        border: 1px solid #c3cfd9;
    }
`

export default function PricingDetails() {
    const { t } = useTranslation('pricing-details')

    return (
        <StyledIframe>
            <iframe title="Pricing Details" width="100%" height="500rem">
                <h1>{t('how-to')}</h1>
                <h3>{t('packages')}</h3>
                <h5>{t('1-credit')}</h5>
                <h3>{t('exemples')}</h3>
                <img
                    src={'../../src/styles/assets/images/pricing/tableur.png'}
                    alt="tableur_pricing"
                    width="90%"
                    height="10rem"
                />
            </iframe>
        </StyledIframe>
    )
}
