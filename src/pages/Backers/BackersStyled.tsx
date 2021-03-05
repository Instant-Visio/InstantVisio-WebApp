import styled from 'styled-components'
import { SCREEN } from '../../styles/theme'

export const BackersTitle = styled.h2`
    display: flex;
    justify-content: center;
    text-align: center;
`
export const BackersStyled = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    .media {
        &-link {
            color: ${({ theme }) => theme.color.black};
        }
    }

    div {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin: ${({ theme }) => theme.spacing.XL} 0;
    }

    ${SCREEN.DESKTOP} {
        flex-flow: row wrap;
        padding: 0 ${({ theme }) => theme.spacing.XL};
        align-items: flex-start;
        text-align: left;
        > div {
            margin: ${({ theme }) => theme.spacing.XXXL};
        }
    }
`
