import React from 'react'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import { SCREEN } from '../../styles/theme'
import Button from '@material-ui/core/Button'
import { IonContent } from '@ionic/react'
import { withStyles } from '@material-ui/core'

const StyledButton = withStyles({
    root: {
        background: '#6558f5',
        color: 'white',
        padding: '6px 14px',
        marginTop: '24px',
        fontSize: '0.9rem',
        fontWeight: 'bolder',
        alignSelf: 'center',
    },
    label: {
        textTransform: 'capitalize',
    },
})(Button)

const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
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
        height: 7rem;
    }
    p {
        margin-bottom: 0rem;
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

    return (
        <IonContent style={{ '--background': 'white' }}>
            <Wrapper>
                <ColumnView>
                    <div className="textContainer">
                        <h3>{t('instant-visio')}</h3>
                        <h5>{t('mission-statement')}</h5>
                        <p>✔ {t('invitation-SMS-email')}</p>
                        <p>✔ {t('up-to-4')}</p>
                        <p>✔ {t('encrypted-calls')}</p>
                    </div>
                    <StyledButton>{t('support-us')}</StyledButton>
                </ColumnView>
                <ColumnView>
                    <div className="textContainer">
                        <h3>{t('entreprise-institution')}</h3>
                        <h5>{t('profil-persona')}</h5>
                        <p>✔ {t('up-to-50')}</p>
                        <p>✔ {t('encrypted-calls-EU')}</p>
                        <p>✔ {t('sharescreen"')}</p>
                        <p>✔ {t('invitation-SMS-email-notifs')}</p>
                        <p>✔ {t('group-contact')}</p>
                        <p>✔ {t('reminder-SMS-email')}</p>
                        <p>✔ {t('API-instantvisio')}</p>
                    </div>
                    <StyledButton>{t('choose-subscription')}</StyledButton>
                </ColumnView>
            </Wrapper>
        </IonContent>
    )
}
