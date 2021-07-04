import React from 'react'
import styled from 'styled-components'

const Text = styled.p`
    color: ${({ theme }) => theme.color.red};
    margin-bottom: 0 !important;
`

export const ErrorMessageNoFreeSMS = ({ t }) => {
    return (
        <>
            <Text>{t('phone.notAllowed')}</Text>
            <a
                target="_blank"
                href="https://www.helloasso.com/associations/instant-visio/formulaires/1">
                helloasso.com/associations/instant-visio
            </a>
            <br />
            <br />
        </>
    )
}
