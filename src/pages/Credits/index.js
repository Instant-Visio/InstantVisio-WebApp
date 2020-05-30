import React from 'react'
import { useTranslation } from 'react-i18next'
import DefaultLayout from '../../layout/Default'
import CreditsStyled from './Credits'
import data from './data.json'
import { IonContent } from '@ionic/react'

const sort = ({ name: aName }, { name: bName }) => {
    const [, aLastname] = aName.split(' ')
    const [, bLastname] = bName.split(' ')
    if (bLastname && aLastname) {
        return aLastname.localeCompare(bLastname)
    }

    return 0
}

// eslint-disable-next-line react/prop-types
const renderName = ({ name, link }, index) => {
    return (
        <p key={`person-${index}`}>
            {!link && <span>{name}</span>}
            {link && (
                <a
                    className="credits-link"
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer">
                    {name}
                </a>
            )}
        </p>
    )
}

const Credits = () => {
    const { t } = useTranslation('credits')

    const render = ([type, values], index) => {
        return (
            <div key={`credit-type-${index}`}>
                <h3 className="credits-title">{t(type)}</h3>
                {values.sort(sort).map(renderName)}
            </div>
        )
    }

    return (
        <IonContent>
            <DefaultLayout title={`${t('page-title')} - Instant Visio`}>
                <CreditsStyled>
                    {Object.entries(data).map(render)}
                </CreditsStyled>
            </DefaultLayout>
        </IonContent>
    )
}

export default Credits
