import React from 'react'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import VerticallyCenteredModal from '../../components/VerticallyCenteredModal/VerticallyCenteredModal'
import useDetectMobileOrTablet from '../../hooks/useDetectMobileOrTablet'
import { SCREEN } from '../../styles/theme'

const Wrapper = styled.div`
    display: flex;
    position: relative;
    flex-direction: column;
    ${SCREEN.DESKTOP} {
        flex-direction: row;
    }
`

const ColumnView = styled.div`
    padding: ${({ theme }) => `4rem ${theme.spacing.L} ${theme.spacing.L}`};
    width: 100%;
    background: ${({ theme }) => theme.color.white};
    border: 1px solid black;
    margin: ${({ theme }) => theme.spacing.L};
    ${SCREEN.DESKTOP} {
        padding: ${({ theme }) =>
            `${theme.spacing.XXXL} ${theme.spacing.M} ${theme.spacing.XXXL} ${theme.spacing.M}`};
        width: 55%;
    }
`

const WrapperMobile = styled.div``

const MobileContent = styled.div`
    padding-left: 5%;
    padding-right: 5%;
    color: ${({ theme }) => theme.color.white};
`

export default function Pricing() {
    const { t } = useTranslation('pricing')
    const isMobile = useDetectMobileOrTablet()
    const [modalShow, setModalShow] = React.useState(false)

    return (
        <>
            {!isMobile ? (
                <Wrapper>
                    <ColumnView>
                        <h2>{t('instant-visio')}</h2>
                    </ColumnView>
                    <ColumnView>
                        <h2>{t('entreprise-institution')}</h2>
                    </ColumnView>
                </Wrapper>
            ) : (
                <WrapperMobile key={'anchor-left'}>
                    <MobileContent>
                        <VerticallyCenteredModal
                            show={modalShow}
                            onHide={() =>
                                setModalShow(false)
                            }></VerticallyCenteredModal>
                        Version Mobile
                    </MobileContent>
                </WrapperMobile>
            )}
        </>
    )
}
