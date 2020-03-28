import styled from 'styled-components'
import theme from './theme'

const DefaultStyled = styled.div`
    margin: ${theme.spacing.XXXL};
    .default {
        background: ${theme.color.white};
        border-radius: ${theme.spacing.XS};
        min-width: 100%;

        &-title {
            font-size: ${theme.font.XL};
            margin-bottom: ${theme.spacing.M};
            color: ${theme.color.grey};
        }

        &-smallTitle {
            font-size: ${theme.font.L};
            color: ${theme.color.grey};
        }
    }

    p, strong {
        color: ${theme.color.grey};
    }

    a {
        text-decoration: underline;
    }

    p, label {
        font-size: ${theme.font.S};
        color: ${theme.color.textGrey};
    }

    @media (min-width: 300px) {
        margin: ${theme.spacing.XXL};
        .default {
            padding: ${theme.spacing.XXL};
        }
    }

    @media (min-width: 1000px) {
        .default {
            padding: ${theme.spacing.XXXL};
        }
    }
`

export default DefaultStyled