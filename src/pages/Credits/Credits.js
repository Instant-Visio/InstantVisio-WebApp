import styled from 'styled-components'
import { SCREEN } from '../../styles/theme'

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
            &:not(:last-child){
                margin-bottom: ${({ theme }) => theme.spacing.XXL};
            }
        }
    }
`

export default CreditsStyled
