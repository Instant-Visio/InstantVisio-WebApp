import React from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

const ModalContent = styled.div`
    margin: ${({ theme }) =>
        `0rem ${theme.spacing.XXXL} 0rem ${theme.spacing.XXL}`};
    h3 {
        text-align: center;
        margin-bottom: 0rem;
        font-weight: bold;
    }
    h3:nth-of-type(1) {
        margin-bottom: ${({ theme }) => theme.spacing.XXXL};
    }
    p {
        font-size: ${({ theme }) => theme.spacing.L};
        margin-bottom: 0rem;
    }
    p:nth-of-type(2) {
        margin-bottom: 2rem;
    }
`

export default function PricingDetails() {
    const { t } = useTranslation('pricing-details')

    return (
        <ModalContent>
            <h3>{t('information.packages')}</h3>
            <p>{t('information.1-credit')}</p>
            <p>{t('information.120mn')}</p>
            <h3>{t('information.questions')}</h3>
            <h3>{t('information.examples')}</h3>
            <img
                src="images/pricing-details/tableur.png"
                alt="tableur_pricing"
                width="100%"
            />
        </ModalContent>
    )
}
