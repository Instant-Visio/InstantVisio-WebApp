import React from 'react'
import { useTranslation } from 'react-i18next'
import { IonContent } from '@ionic/react'
import styled from 'styled-components'
import SvgIcon from '@material-ui/core/SvgIcon'

const InformationBlock = styled.div`
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    flex-direction: column;
    width: 80%;
    margin-left: 10%;

    h2 {
        font-weight: 900;
        margin-bottom: 4rem;
    }
    h4 {
        font-weight: 900;
    }
`
const CenteredText = styled.div`
    text-align: center;
`

function ArrowTopLeft(props) {
    return (
        <SvgIcon {...props}>
            <path
                fill="currentColor"
                color="#C3CFD9"
                d="M19,17.59L17.59,19L7,8.41V15H5V5H15V7H8.41L19,17.59Z"
            />
        </SvgIcon>
    )
}

export default function PermissionVideoAudio() {
    const { t } = useTranslation('permissions-audio-video')

    return (
        <IonContent style={{ '--background': 'white' }}>
            <InformationBlock>
                <CenteredText>
                    <ArrowTopLeft style={{ fontSize: 300 }} />
                    <h2>{t('permission-camera-micro')}</h2>
                    <h4>{t('when-clicked')}</h4>
                </CenteredText>
            </InformationBlock>
        </IonContent>
    )
}
