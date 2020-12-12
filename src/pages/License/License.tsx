import React from 'react'
import { useTranslation } from 'react-i18next'
import DefaultLayout from '../../layout/Default/Default'
import { IonContent } from '@ionic/react'
import styled from 'styled-components'

const LicenseStyled = styled.div`
    a {
        color: blue;
    }
`

const License = () => {
    const { t } = useTranslation('license')

    return (
        <IonContent>
            <DefaultLayout title={`${t('page-title')} - Instant Visio`}>
                <LicenseStyled>
                    <p>
                        You can read Instant Visio application and source code
                        license{' '}
                        <a href="https://github.com/Instant-Visio/InstantVisio-WebApp/blob/master/LICENSE">
                            here
                        </a>
                        .
                    </p>
                    <p>
                        Some of the components used to provide premium video
                        calls features are instead under Apache 2.0 License:
                        <ul>
                            <li>
                                you can have more details in our{' '}
                                <a href="https://github.com/Instant-Visio/InstantVisio-WebApp/tree/master/NOTICE">
                                    NOTICE file
                                </a>
                            </li>
                            <li>
                                you can read the full text of the Apache 2.0
                                license{' '}
                                <a href="https://github.com/Instant-Visio/InstantVisio-WebApp/tree/master/src/pages/PremiumVideoCall/LICENSE">
                                    here
                                </a>
                            </li>
                        </ul>
                    </p>
                    <p>
                        We make use of{' '}
                        <a href="https://github.com/mui-org/material-ui">
                            material-ui library
                        </a>
                        . You can find its license and copyright notice{' '}
                        <a href="https://github.com/mui-org/material-ui/blob/next/LICENSE">
                            here
                        </a>
                        .
                    </p>
                </LicenseStyled>
            </DefaultLayout>
        </IonContent>
    )
}

export default License
