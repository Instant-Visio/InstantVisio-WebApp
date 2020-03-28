import React from 'react'
import styled from 'styled-components'
import color from 'color'
import { useTranslation, Trans } from 'react-i18next'
import { SCREEN } from '../../styles/theme'
import List from '../../components/List'
import Logo from '../../components/Logo'

const Wrapper = styled.div`
    color: ${({theme}) => theme.color.grey};
    display: flex;
    flex-direction: column;
    height: 100%;
    ${SCREEN.DESKTOP_AND_TABLET}{
        margin-left: ${({theme}) => theme.spacing.XXL};
        margin-right: 5rem;
    }
    & img {
        align-self: center;
        ${SCREEN.DESKTOP_AND_TABLET}{
            align-self: flex-start;
        }
    }
`

const Baseline = styled.p`
    font-size: ${({theme}) => theme.font.XL};
    margin-top: ${({theme}) => theme.spacing.XXXL};
    font-weight: bold;

    ${SCREEN.DESKTOP_AND_TABLET}{
        font-size: ${({theme}) => theme.font.XXXL};
        margin-bottom: ${({theme}) => theme.spacing.XXXL};
    }

    & span {
       text-decoration: underline;
       text-decoration-color: ${({theme}) => theme.color.blue};
    }
`

const Information = styled.div`
    border: 1px solid ${({theme}) => theme.color.grey};
    background: ${({theme}) => color(theme.color.grey).lighten(3.3).toString()};
    border-radius: 0.5rem;
    margin-top: ${({theme}) => theme.spacing.L};
    padding: ${({theme}) => theme.spacing.L};
    
    p {
        font-weight: bold;
    }

`
export default function Description(){
    const {t} = useTranslation(['home'])
    return (<Wrapper>
        <Logo />
        <Baseline>
            <Trans i18nKey='common:baseline'>
                Joignez un proche en visio, en un clic, <span>gratuitement.</span>
            </Trans>
        </Baseline>
        <Information>
            <p>{t('information.title')}</p>
            <List>
                <span>{t('information.steps.1')}</span>
                <span>{t('information.steps.2')}</span>
                <span>{t('information.steps.3')}</span>
            </List>
        </Information>
    </Wrapper>)
}