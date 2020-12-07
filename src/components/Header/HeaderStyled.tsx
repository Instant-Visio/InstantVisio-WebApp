import styled from 'styled-components'
import { SCREEN } from 'src/styles/theme'

export const HeaderStyled = styled.header`
    background-color: ${({ theme }) => theme.color.white};
    display: flex;
    width: 100vw;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: left;
    .header {
        min-width: 100%;
        padding: ${({ theme }) => theme.spacing.XXL};
        flex-direction: row;
        justify-content: space-between;

        &-baseline {
            color: ${({ theme }) => theme.color.logoGrey};
            font-weight: 500;
            padding-right: 0;
            margin-right: 0;
            ${SCREEN.MOBILE} {
                display: none;
            }

            &-content {
                font-family: 'Baloo Thambi 2'; cursive;
                font-size: ${({ theme }) => theme.font.XL};
                margin-bottom: 0;
                text-align: right;
            }
        }
    }

    ${SCREEN.MOBILE_AND_TABLET} {
        padding: 0;
        width: 100%;
        .header {
            flex-direction: column;
            justify-content: center;
        }
    }

    ${SCREEN.DESKTOP} {
        padding: 0 2rem;
    }
})
`

export const HeaderLogoBaseline = styled.div`
    display: flex;
    align-items: center;
    flex-direction: row;
    ${SCREEN.MOBILE} {
        justify-content: center;
    }
`
