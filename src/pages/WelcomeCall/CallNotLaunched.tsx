import React from 'react'
import { useTranslation } from 'react-i18next'
import { IonContent } from '@ionic/react'
import styled from 'styled-components'
import QueryBuilderIcon from '@material-ui/icons/QueryBuilder'
import { Link } from 'react-router-dom'

const InformationBlock = styled.div`
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    flex-direction: column;
    width: 80%;
    margin-left: 8%;

    h1 {
        font-weight: 700;
    }
    h2 {
        font-weight: 'bold';
    }
    h4:nth-of-type(3) {
        margin-bottom: 3rem;
    }
    h4:nth-of-type(4) {
        margin-bottom: ${({ theme }) => theme.spacing.XXL};
    }
    a {
        color: black;
        text-decoration: underline;
        font-size: ${({ theme }) => theme.font.L};
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

export default function CallNotLaunched() {
    const { t } = useTranslation('call-not-launched')

    return (
        <IonContent style={{ '--background': 'white' }}>
            <InformationBlock slot="fixed">
                <CenteredText>
                    <QueryBuilderIcon style={{ fontSize: 100 }} />
                    <h1>{t('hello-welcome')}</h1>
                    <h4>{t('discussion-is-not-launched')}</h4>
                    <h4>{t('takes-places-at')}</h4>
                    <h4>{t('too-early')}</h4>
                    <h4>{t('enjoy')}</h4>
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
