import React from 'react'
import { useTranslation } from 'react-i18next'

import DefaultLayout from '../../layout/Default'
import CreditsStyled from './Credits'


const Credits = () => {
    const {t} = useTranslation('credits')

    return (
        <DefaultLayout title={`${t('page-title')} - Instant Visio`}>
            <CreditsStyled>
                <div>
                    <h3 className="credits-title">{t('creators')}</h3>
                    <p><a className="credits-link" href="https://fr.linkedin.com/in/stephanelucon" target="_blank" rel="noopener noreferrer">Stéphane Luçon</a></p>
                </div>
                <div>
                    <h3 className="credits-title">{t('developers')}</h3>
                    <p><a className="credits-link" href="https://abebangwe.com" target="_blank" rel="noopener noreferrer">Abeba Ngwe</a></p>
                    <p><a className="credits-link" href="https://fr.linkedin.com/in/nicolas-tchouanmou-7029a112" target="_blank" rel="noopener noreferrer">Nicolas Tchouanmou</a></p>
                    <p><a className="credits-link" href="http://twitter.com/hugogresse" target="_blank" rel="noopener noreferrer">Hugo Gresse</a></p>
                    <p><a className="credits-link" href="https://fr.linkedin.com/in/stephanelucon" target="_blank" rel="noopener noreferrer">Stéphane Luçon</a></p>
                </div>
                <div>
                    <h3 className="credits-title">{t('ux-designers')}</h3>
                    <p><a className="credits-link" href="https://fr.linkedin.com/in/sebastienlhoste" target="_blank" rel="noopener noreferrer">Sébastien L'Hoste</a></p>
                    <p><a className="credits-link" href="https://fr.linkedin.com/in/antoinedeglesne" target="_blank" rel="noopener noreferrer">Antoine Deglesne</a></p>
                </div>
                <div>
                    <h3 className="credits-title">{t('graphic-designers')}</h3>
                    <p><a className="credits-link" href="https://fr.linkedin.com/in/oph%C3%A9lie-strezlec-b40385103" target="_blank" rel="noopener noreferrer">Ophélie Strezlec</a></p>
                </div>
                <div>
                    <h3 className="credits-title">{t('partners')}</h3>
                    <p><a className="credits-link" href="https://www.daily.co" target="_blank" rel="noopener noreferrer">Daily.co</a></p>
                    <p><a className="credits-link" href="https://www.ovh.com" target="_blank" rel="noopener noreferrer">OVHcloud</a></p>
                </div>
            </CreditsStyled>
        </DefaultLayout>
    )
}

export default Credits