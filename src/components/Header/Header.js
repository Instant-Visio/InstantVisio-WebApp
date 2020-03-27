import styled from 'styled-components'
import theme from '../../styles/theme'

const HeaderStyled = styled.header`
    background-color: #323742;
    display: flex;
    width: 100vw;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: calc(10px + 2vmin);
    text-align: left;
    .header {
        display: flex;
        
        &-baseline {
            color: ${theme.color.logoGrey};
            font-weight: 500;
            
            &-content {
                font-family: 'Baloo Thambi 2'; cursive;
                font-size: 3.5vh;
            }
        }

export default Header