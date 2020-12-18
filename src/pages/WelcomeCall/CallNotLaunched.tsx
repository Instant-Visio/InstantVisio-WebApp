import React from 'react'
import { useTranslation } from 'react-i18next'
import { IonContent } from '@ionic/react'
import styled from 'styled-components'
import SvgIcon from '@material-ui/core/SvgIcon'
import { Link } from 'react-router-dom'

const InformationBlock = styled.div`
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    flex-direction: column;
    width: 80%;
    margin-left: 10%;

    h1 {
        font-weight: 800;
    }
    h2 {
        font-weight: 'bold';
    }
    h3:nth-of-type(3) {
        margin-bottom: 4rem;
    }
    h3:nth-of-type(4) {
        margin-bottom: ${({ theme }) => theme.spacing.XXL};
    }
    a {
        color: black;
        text-decoration: underline;
        font-size: ${({ theme }) => theme.font.XL};
        margin-bottom: ${({ theme }) => theme.spacing.S};
    }
`
const CenteredText = styled.div`
    text-align: center;
`
const MenuList = styled.div`
    display: flex;
    flex-direction: column;
`

function AccessTimeIcon(props) {
    return (
        <SvgIcon {...props}>
            <path
                fill="currentColor"
                d="M12 20C16.4 20 20 16.4 20 12S16.4 4 12 4 4 7.6 4 12 7.6 20 12 20M12 2C17.5 2 22 6.5 22 12S17.5 22 12 22C6.5 22 2 17.5 2 12C2 6.5 6.5 2 12 2M17 11.5V13H11V7H12.5V11.5H17Z"
            />
        </SvgIcon>
    )
}

export default function CallNotLaunched() {
    const { t } = useTranslation('call-not-launched')

    return (
        <IonContent style={{ '--background': 'white' }}>
            <InformationBlock title="not-used-here">
                <CenteredText>
                    <AccessTimeIcon style={{ fontSize: 110 }} />
                    <h1>{t('hello-welcome')}</h1>
                    <h3>{t('discussion-is-not-launched')}</h3>
                    <h3>{t('takes-places-at')}</h3>
                    <h3>{t('too-early')}</h3>
                    <h3>{t('enjoy')}</h3>
                    <MenuList>
                        <Link to="/pages/join-last-call">
                            {t('discover-join')}
                        </Link>
                        <Link to="/pages/home">{t('discover-create')}</Link>
                        <Link to="/static/media/Instant_Visio_Keynote.e243b3bd.pdf">
                            {t('discover-us')}
                        </Link>
                    </MenuList>
                </CenteredText>
            </InformationBlock>
        </IonContent>
    )
}
