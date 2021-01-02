import React from 'react'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import { SCREEN } from '../../styles/theme'
import Button from '@material-ui/core/Button'
import { IonContent } from '@ionic/react'

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

    // TODO: customize color of Mui-button with color='#6558f5'
    button {
        align-self: center;
        margin-top: ${({ theme }) => theme.spacing.XL};
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
                        <h5>{t('item0')}</h5>
                        <p>✔ {t('item1')}</p>
                        <p>✔ {t('item2')}</p>
                        <p>✔ {t('item3')}</p>
                    </div>
                    <Button variant="contained" color="primary">
                        {t('support-us')}
                    </Button>
                </ColumnView>
                <ColumnView>
                    <div className="textContainer">
                        <h3>{t('entreprise-institution')}</h3>
                        <h5>{t('item4')}</h5>
                        <p>✔ {t('item5')}</p>
                        <p>✔ {t('item6')}</p>
                        <p>✔ {t('item7')}</p>
                        <p>✔ {t('item8')}</p>
                        <p>✔ {t('item9')}</p>
                        <p>✔ {t('item10')}</p>
                        <p>✔ {t('item11')}</p>
                    </div>
                    <Button variant="contained" color="primary">
                        {t('choose-subscription')}
                    </Button>
                </ColumnView>
            </Wrapper>
        </IonContent>
    )
}
