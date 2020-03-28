import styled from 'styled-components'
import theme from '../../styles/theme'

const HeaderStyled = styled.header`
    background-color: ${theme.color.white};
    display: flex;
    width: 100vw;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: calc(10px + 2vmin);
    text-align: left;
    .header {
        display: flex;
        min-width: 100%;
        padding-right: 0;
        padding-left: 0;
        
        &-baseline {
            color: ${theme.color.logoGrey};
            font-weight: 500;
            padding-right: 0;
            
            &-content {
                font-family: 'Baloo Thambi 2'; cursive;
                font-size: 3.5vh;
            }
        }

        &-mobileLogo {
            width: 22vh;
        }

        &-desktopLogo {
            width: 37vh;
            text-align: left;
        }
    };
    @media screen and (min-width: 300px) {
        padding: 0;
        width: 100%;
        .header {
            flex-direction: column;
            justify-content: center;
            align-items: center;
            
            &-baseline-content {
                display: none;
            }

            &-mobileLogo {
                margin: 4vh 0;
            }

            &-desktopLogo {
                display: none;
            }
        }
    };
    @media screen and (min-width: 1024px) {
        width: 100vw;
        height: 20vh;
        padding: 2rem;
        .header {
            flex-direction: row;
            justify-content: space-between;
            
            &-baseline-content {
                display: block;
                margin: 0;
                text-align: right;
            }

            &-mobileLogo {
                display: none;
            }

            &-desktopLogo {
                display: block;
            }
        }
    }
`

export default HeaderStyled
