import styled from 'styled-components'


const FooterStyled = styled.footer`
    background: #222222;
    padding: ${({theme}) => theme.spacing.XXL};
    display: flex;
    justify-content: center;
    color: #7D7D7D;
    font-size: 16px;
    width: 100%;
    .footer {
        list-style: none;
        display: flex;
        margin: 0;
        padding: 0;
        flex-wrap: wrap;
        justify-content: center;
        &-link {
            list-style: none;
            margin: 0 ${({theme}) => theme.spacing.M};
            padding: ${({theme}) => theme.spacing.XXS} 0;
            
            &-content {
                color: #7D7D7D;
                text-decoration: none;

                &:visited, &:active {
                    color: #7D7D7D;
                }
            }
        }
    }
})
`

export default FooterStyled
