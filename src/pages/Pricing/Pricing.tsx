import React from 'react'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import { SCREEN } from '../../styles/theme'
import { useHistory } from 'react-router-dom'
import InstantButton from '../../components/Button/InstantButton'

const listPackage = [
    'up-to-50',
    'encrypted-calls-EU',
    'sharescreen"',
    'invitation-SMS-email-notifs',
    'group-contact',
    'reminder-SMS-email',
    'API-instantvisio',
]

const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    background-color: white;
    ${SCREEN.MOBILE} {
        flex-direction: column;
    }
`

const ColumnView = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: ${({ theme }) =>
        `4rem ${theme.spacing.XXXL} 4rem ${theme.spacing.XXXL}`};
    background: ${({ theme }) => theme.color.white};
    border: 1px solid #c3cfd9;
    margin: ${({ theme }) => theme.spacing.XXL};

    h3 {
        margin-bottom: ${({ theme }) => theme.spacing.XXXL};
    }

    h5:nth-of-type(1) {
        min-height: 7rem;
    }
    p {
        margin-bottom: 0rem;
    }
    .subscriptionButton {
        text-decoration: none;
        text-align: center;
    }

    ${SCREEN.MOBILE} {
        flex-direction: column;
        padding: ${({ theme }) =>
            `${theme.spacing.XXL} 3rem ${theme.spacing.XXL} 3rem`};
    }
    ${SCREEN.DESKTOP} {
        padding: ${({ theme }) =>
            `${theme.spacing.XXXL} 3rem ${theme.spacing.XXXL} 3rem`};
        width: 30%;
    }
`

export default function Pricing() {
    const { t } = useTranslation('pricing')
    const history = useHistory()

    return (
        <Wrapper>
            <ColumnView>
                <div className="textContainer">
                    <h3>{t('instant-visio')}</h3>
                    <h5>{t('mission-statement')}</h5>
                    <p>✔ {t('invitation-SMS-email')}</p>
                    <p>✔ {t('up-to-4')}</p>
                    <p>✔ {t('encrypted-calls')}</p>
                </div>
                <a
                    className="subscriptionButton"
                    href="https://www.helloasso.com/associations/instant-visio/paiements/paiement-express"
                    target="_blank"
                    rel="noopener noreferrer">
                    <InstantButton
                        title={t('support-us')}
                        bgColor="#6558f5"
                        bgColorHover="#1c2dc1"
                    />
                </a>
            </ColumnView>
            <ColumnView>
                <div className="textContainer">
                    <h3>{t('entreprise-institution')}</h3>
                    <h5>{t('profil-persona')}</h5>
                    {listPackage.map((item, index) => (
                        <p key={index}>✔ {t(item)}</p>
                    ))}
                </div>
                <div className="subscriptionButton">
                    <InstantButton
                        title={t('choose-subscription')}
                        onClick={() => history.push('/pricing/subscriptions')}
                        bgColor="#6558f5"
                        bgColorHover="#1c2dc1"
                    />
                </div>
            </ColumnView>
        </Wrapper>
    )
}
