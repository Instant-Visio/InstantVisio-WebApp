import styled from 'styled-components'
import { SCREEN } from '../../styles/theme'

const CreditsStyled = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
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
        justify-content: space-between;
        padding: 0 ${({ theme }) => theme.spacing.XXL};
        align-items: flex-start;
        text-align: left;
    }
`

export default CreditsStyled
