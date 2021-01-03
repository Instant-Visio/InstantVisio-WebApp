import React from 'react'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import { SCREEN } from '../../styles/theme'
import Button from '@material-ui/core/Button'
import { IonContent } from '@ionic/react'
import { withStyles } from '@material-ui/core'
import { useHistory } from 'react-router-dom'

const ButtonPurple = withStyles({
    root: {
        background: '#6558f5',
        color: 'white',
        padding: '6px 14px',
        marginTop: '24px',
        fontSize: '0.9rem',
        fontWeight: 'bolder',
    },
    label: {
        textTransform: 'capitalize',
    },
})(Button)

const ButtonGreen = withStyles({
    root: {
        background: '#1aae9f',
        color: 'white',
        padding: '6px 14px',
        marginTop: '24px',
        fontSize: '0.9rem',
        fontWeight: 'bolder',
    },
    label: {
        textTransform: 'capitalize',
    },
})(Button)

const MainView = styled.div`
    h1 {
        font-size: ${({ theme }) => theme.spacing.XL};
        text-align: center;
    }
`

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
    padding: 2rem 2% 2rem 2%;
    min-width: 220px;
    background: ${({ theme }) => theme.color.white};
    border: 1px solid #c3cfd9;
    margin: ${({ theme }) => theme.spacing.XXL};

    h3 {
        margin-bottom: ${({ theme }) => theme.spacing.XXXL};
        text-align: center;
    }

    h5:nth-of-type(1),
    h5:nth-of-type(2) {
        height: 4rem;
    }
    p {
        margin-bottom: 0rem;
    }
    .infoContainer {
        // border: 1px solid #c3cfd9; // DEBUG
    }
    .listContainer {
        // border: 1px solid #c3cfd9; // DEBUG
    }

    ${SCREEN.MOBILE} {
        flex-direction: column;
        padding: ${({ theme }) =>
            `${theme.spacing.XXL} 3rem ${theme.spacing.XXL} 3rem`};
    }
    ${SCREEN.DESKTOP} {
        padding: ${({ theme }) =>
            `${theme.spacing.XXXL} 3rem ${theme.spacing.XXXL} 3rem`};
        width: 25%;
    }
`

export default function Subscriptions() {
    const { t } = useTranslation('pricing')
    const history = useHistory()

    return (
        <IonContent style={{ '--background': 'white' }}>
            <MainView>
                <h1>{t('ours-subscriptions')}</h1>
                <Wrapper>
                    <ColumnView>
                        <div className="infoContainer">
                            <h3>{t('free')}</h3>
                            <h5>{t('meeting1')}</h5>
                            <h5>{t('50-visios')}</h5>
                            <p>✔ {t('item1')}</p>
                            <p>✔ {t('item2')}</p>
                            <p>✔ {t('item3')}</p>
                        </div>
                        <ButtonPurple onClick={() => history.push('/pricing')}>
                            {t('support-us')}
                        </ButtonPurple>
                    </ColumnView>
                    <ColumnView>
                        <div className="infoContainer">
                            <h3>{t('premium')}</h3>
                            <h5>{t('meeting2')}</h5>
                            <h5>{t('10K-credits-visio')}</h5>
                            <h5>{t('500-creditss')}</h5>
                            <h5>{t('unlimited')}</h5>
                        </div>
                        <div className="listContainer">
                            <ButtonGreen
                                onClick={() => history.push('/pricing')}>
                                {t('estimate-need')}
                            </ButtonGreen>
                            <p>✔ {t('item5')}</p>
                            <p>✔ {t('item6')}</p>
                            <p>✔ {t('item7')}</p>
                            <p>✔ {t('item8')}</p>
                            <p>✔ {t('item9')}</p>
                            <p>✔ {t('item10')}</p>
                            <p>✔ {t('item11')}</p>
                        </div>
                        <ButtonPurple>{t('subscription1')}</ButtonPurple>
                    </ColumnView>
                    <ColumnView>
                        <div className="infoContainer">
                            <h3>{t('business')}</h3>
                            <h5>{t('meeting3')}</h5>
                            <h5>{t('60K-credits-visio')}</h5>
                            <h5>{t('3000-credits')}</h5>
                            <h5>{t('unlimited')}</h5>
                        </div>
                        <div className="listContainer">
                            <ButtonGreen>{t('estimate-need')}</ButtonGreen>
                            <p>✔ {t('item5')}</p>
                            <p>✔ {t('item6')}</p>
                            <p>✔ {t('item7')}</p>
                            <p>✔ {t('item8')}</p>
                            <p>✔ {t('item9')}</p>
                            <p>✔ {t('item10')}</p>
                            <p>✔ {t('item11')}</p>
                        </div>
                        <ButtonPurple>{t('subscription2')}</ButtonPurple>
                    </ColumnView>
                </Wrapper>
            </MainView>
        </IonContent>
    )
}
