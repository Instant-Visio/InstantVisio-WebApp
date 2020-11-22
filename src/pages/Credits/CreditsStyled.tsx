import styled from 'styled-components'
import { SCREEN } from 'src/styles/theme'

const CreditsStyled = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    .credits {
        &-title {
            margin-bottom: ${({ theme }) => theme.spacing.M};
        }

        &-link {
            text-decoration: none;
        }
    }

    ${SCREEN.DESKTOP} {
        flex-flow: row wrap;
        padding: 0 ${({ theme }) => theme.spacing.XXL};
        align-items: flex-start;
        text-align: left;
        > div {
            margin: 0 ${({ theme }) => theme.spacing.XXXL};
            &:not(:last-child) {
                margin-bottom: ${({ theme }) => theme.spacing.XXL};
            }
        }
    }

    ${SCREEN.MOBILE} {
        padding: 0 ${({ theme }) => theme.spacing.S};
        > div {
            margin: 0;
            &:not(:last-child) {
                margin-bottom: 0;
            }
        }

        p {
            margin-bottom: ${({ theme }) => theme.spacing.XXS};
        }

        h3 {
            margin-top: ${({ theme }) => theme.spacing.S};
            margin-bottom: ${({ theme }) => theme.spacing.S};
        }

        .credits {
        &-title {
            margin-top: ${({ theme }) => theme.spacing.XS};
            margin-bottom: ${({ theme }) => theme.spacing.XS};
        }

    }
`

export default CreditsStyled
