import styled from 'styled-components'
import theme from '../../styles/theme'

const LegalMentionsStyled = styled.div`
.legal-mentions {
    margin-top: ${theme.spacing.XXXL};
    margin-bottom: ${theme.spacing.XXXL};
    font-size: ${theme.spacing.S};
    color: ${theme.color.logoGrey};

    p a, strong {
        color: ${theme.color.white};
    }

    &-title {
        font-size: ${theme.font.XL};
        margin-bottom: ${theme.spacing.M};
        color: ${theme.color.white};

        &-smallTitle {
            font-size: ${theme.font.L};
            color: ${theme.color.white};
        }
    }
}`

export default LegalMentionsStyled