import styled from 'styled-components'
import theme from '../../styles/theme'


const CreditsStyled = styled.div`
    display: flex;
    flex-direction: column;
    .credits {
        &-title {
            margin-bottom: ${theme.spacing.M};
        }

        &-link {
            text-decoration: none;
        }
    }

    @media (min-width: 1024px) {
        flex-flow: row wrap;
        justify-content: space-around;
    }

`

export default CreditsStyled
