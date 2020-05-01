import styled from 'styled-components'
import { SCREEN } from '../../styles/theme'

const FooterStyled = styled.footer`
    background: #222222;
    padding: ${({ theme }) => theme.spacing.XXL};
    display: flex;
    justify-content: center;
    color: #7d7d7d;
    font-size: 16px;
    width: 100%;
    .footer {
        height: 80%;
        list-style: none;
        display: flex;
        margin: 0;
        padding: 0;
        flex-wrap: wrap;
        justify-content: center;
        &-link {
            list-style: none;
            margin: 0 ${({ theme }) => theme.spacing.M};
            padding: ${({ theme }) => theme.spacing.XXS} 0;

            &-content {
                color: #7d7d7d;
                text-decoration: none;
                border: none;
                background: none;
                outline: none;
                &:visited,
                &:active {
                    color: #7d7d7d;
                }
            }
        }
    }

    ${SCREEN.MOBILE_AND_TABLET} {
        .footer {
            padding-bottom: ${({ theme }) => theme.spacing.XXL};
        }
    }
`

export default FooterStyled
