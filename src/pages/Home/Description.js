import React from 'react'
import styled, { css } from 'styled-components'
import color from 'color'
import { useTranslation, Trans } from 'react-i18next'
import { SCREEN } from '../../styles/theme'
import BaseList from '../../components/List'
import Logo from '../../components/Logo'
import BaseArrow from '../../components/Arrow'
import { useState } from 'react'
import useDetectMobile from '../../hooks/useDetectMobile'

const List = styled(BaseList)`
    ${SCREEN.MOBILE} {
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

    ${SCREEN.TABLET} {
        font-size: ${({ theme }) => theme.spacing.L};
        margin-left: ${({ theme }) => theme.spacing.XXXL};
        width: 29%;
    }

    ${SCREEN.MOBILE} {
        margin-bottom: 0;
        margin-block-end: 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
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

const Baseline = styled.p`
    font-size: ${({ theme }) => theme.font.XL};
    margin-top: ${({ theme }) => theme.spacing.XXXL};
    font-weight: bold;
    text-align: center;

    ${SCREEN.DESKTOP} {
        text-align: left;
        font-size: ${({ theme }) => theme.font.XXXL};
        margin-bottom: ${({ theme }) => theme.spacing.XXXL};
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

    ${SCREEN.MOBILE} {
        width: 100%;
    }

    ${SCREEN.TABLET} {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        padding: ${({ theme }) => theme.spacing.M};

        * {
            margin-bottom: 0;
        }
    }
`

const Arrow = styled(BaseArrow)`
    display: none;
    ${SCREEN.MOBILE} {
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
    const isMobile = useDetectMobile()
    const [collapsed, setCollapsed] = useState(true)

    return (
        <Wrapper>
            <Logo />
            <Baseline>
                <Trans i18nKey="common:homeBaseline">
                    {/* prettier-ignore */}
                    Joignez un proche en visio, en un clic, <span>gratuitement.</span>
                </Trans>
            </Baseline>

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
