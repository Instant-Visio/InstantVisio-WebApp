import React from 'react'
import DefaultLayout from '../../layout/Default'
import { Button } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import styled, { keyframes } from 'styled-components'
import BaseLang from '../../components/Lang'

const blury = keyframes`
  from {
  }

  50% {
        filter: blur(3px);
  }

  to {
        filter: blur(0);
  }
`

const RedirectButton = styled(Button)`
    color: white !important;
    text-decoration: none !important;
`

const Title = styled.h5`
    font-size: 5rem;
    animation: ${blury} 1s ease-in-out infinite;
`

const Page404 = () => {
    const { t } = useTranslation()

    return (
        <DefaultLayout>
            <Title>{t('404.title')}</Title>

            <RedirectButton href="/">{t('404.button')}</RedirectButton>
        </DefaultLayout>
    )
}

export default Page404
