import styled from 'styled-components'
import {SCREEN} from '../../styles/theme'


const HeaderStyled = styled.header`
    background-color: ${({theme}) => theme.color.white};
    display: flex;
    width: 100vw;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: left;
    .header {
        display: flex;
        align-items: center;
        min-width: 100%;
        padding: ${({theme}) => theme.spacing.XXL};
        
        &-baseline {
            color: ${({theme}) => theme.color.logoGrey};
            font-weight: 500;
            padding-right: 0;
            margin-right: 0;
            
            &-content {
                font-family: 'Baloo Thambi 2'; cursive;
                font-size: ${({theme}) => theme.font.XL};
            }
        }
    }

    ${SCREEN.MOBILE_AND_TABLET} {
        padding: 0;
        width: 100%;
        .header {
            flex-direction: column;
            justify-content: center;
            
            &-baseline-content {
                display: none;
            }
        }
    }
    
    ${SCREEN.DESKTOP} {
        width: 100vw;
        height: 20vh;
        padding: ${({theme}) => theme.font.XXL};
        .header {
            flex-direction: row;
            justify-content: space-between;
            
            &-baseline-content {
                display: block;
                margin: 0;
                text-align: right;
            }
        }
    }
})
`

export default HeaderStyled
