import styled from 'styled-components'
import theme from '../../styles/theme'


const CreditsStyled = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    .credits {
        &-title {
            margin-bottom: ${theme.spacing.M};
        }

        &-link {
            text-decoration: none;
        }
    }

    @media (min-width: 1064px) {
        flex-flow: row wrap;
        justify-content: space-between;
        padding: 0 ${theme.spacing.XXL};
        align-items: flex-start;
        text-align:left;
    }

`

export default CreditsStyled
