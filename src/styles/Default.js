import styled from 'styled-components'
import theme from './theme'

const DefaultStyled = styled.div`
    .default {
        margin-top: ${theme.spacing.XXXL};
        margin-bottom: ${theme.spacing.XXXL};
        padding: ${theme.spacing.XXXL};
        background: ${theme.color.white};
        border-radius: ${theme.spacing.XS};

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
`

export default DefaultStyled