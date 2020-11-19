import React, { useState } from 'react'
import styled, { css } from 'styled-components'
import color from 'color'
import { useTranslation, Trans } from 'react-i18next'
import { SCREEN } from '../../styles/theme'
import BaseList from '../../components/List/List'
import Logo from '../../components/Logo/Logo'
import BaseArrow, { BaseArrowProps } from '../../components/Arrow/Arrow'
import useDetectMobileOrTablet from '../../hooks/useDetectMobileOrTablet'

interface Collapsable {
    collapsed: boolean
}

const List = styled(BaseList)<Collapsable>`
    ${SCREEN.MOBILE_AND_TABLET} {
        max-height: 0;
        overflow: hidden;
        transition: all 0.3s ease-in-out;
        ${({ collapsed }) =>
            !collapsed &&
            css`
                max-height: 300px;
                margin-top: ${({ theme }) => theme.spacing.M};
            `}
    }

    ${SCREEN.TABLET} {
        padding-left: 0;
    }
`

const P = styled.p`
    font-weight: bold;

    ${SCREEN.DESKTOP} {
        text-align: left;
    }

    ${SCREEN.MOBILE_AND_TABLET} {
        margin-bottom: 0;
        margin-block-end: 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    ${SCREEN.TABLET} {
        span:first-child {
            width: 100%;
            text-align: center;
        }
    }
`

const Wrapper = styled.div`
    color: ${({ theme }) => theme.color.grey};
    display: flex;
    flex-direction: column;
    height: 100%;
    align-items: center;

    ${SCREEN.DESKTOP} {
        margin-left: ${({ theme }) => theme.spacing.XXL};
        margin-right: 5rem;
        align-items: flex-start;
    }
    & img {
        align-self: center;
        ${SCREEN.DESKTOP} {
            align-self: flex-start;
        }
    }

    .details {
        font-size: ${({ theme }) => theme.font.S};
        margin: ${({ theme }) => theme.spacing.XS} 0;
    }
`

const LogoBaseline = styled.div`
    ${SCREEN.MOBILE_AND_TABLET} {
        display: flex;
        flex-direction: row;
        align-items: center;
    }
`

const Baseline = styled.p`
    font-size: ${({ theme }) => theme.font.M};
    font-weight: bold;
    text-align: left;
    margin-bottom: 0;
    margin-left: ${({ theme }) => theme.font.M};

    ${SCREEN.TABLET} {
        font-size: ${({ theme }) => theme.font.XL};
    }

    ${SCREEN.DESKTOP} {
        font-size: ${({ theme }) => theme.font.XXXL};
        margin-top: ${({ theme }) => theme.spacing.XXXL};
        margin-bottom: ${({ theme }) => theme.spacing.XXXL};
        margin-left: 0;
    }

    & span {
        text-decoration: underline;
        text-decoration-color: ${({ theme }) => theme.color.blue};
    }
`

const Information = styled.div`
    border: 1px solid ${({ theme }) => theme.color.grey};
    background: ${({ theme }) =>
        color(theme.color.grey).lighten(3.3).toString()};
    border-radius: 0.5rem;
    margin-top: ${({ theme }) => theme.spacing.L};
    padding: ${({ theme }) => theme.spacing.L};

    ${SCREEN.MOBILE_AND_TABLET} {
        width: 100%;
    }
`

const Arrow = styled(BaseArrow)<BaseArrowProps & Collapsable>`
    display: none;
    ${SCREEN.MOBILE_AND_TABLET} {
        display: initial;
        margin-bottom: 0.5rem;
        transition: transform 0.3s ease-in-out;
        ${({ collapsed }) =>
            !collapsed &&
            css`
                transform: rotate(45deg);
            `}
    }
`

function Description() {
    const { t } = useTranslation(['home'])
    const isMobile = useDetectMobileOrTablet()
    const [collapsed, setCollapsed] = useState(true)

    return (
        <Wrapper>
            <LogoBaseline>
                <Logo />
                <Baseline>
                    <Trans i18nKey="common:homeBaseline">
                        Joignez un proche en visio, en un clic,
                        {/* prettier-ignore */}
                        <span>gratuitement.</span>
                    </Trans>
                </Baseline>
            </LogoBaseline>

            <Information>
                <P
                    {...(isMobile && {
                        onClick: () => setCollapsed(!collapsed),
                    })}>
                    <span>{t('information.title')}</span>
                    <Arrow collapsed={collapsed} />
                </P>
                <List collapsed={collapsed}>
                    <span>{t('information.steps.1')}</span>
                    <span>{t('information.steps.2')}</span>
                    <span>{t('information.steps.3')}</span>
                </List>
            </Information>
        </Wrapper>
    )
}

export default React.memo(Description)
