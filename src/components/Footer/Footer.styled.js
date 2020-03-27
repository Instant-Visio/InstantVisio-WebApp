import styled from '@emotion/styled';

const FooterStyled = styled.footer({
    background: '#222222',
    padding: '2rem',
    display: 'flex',
    justifyContent: 'center',
    color: '#7D7D7D',
    fontSize: '16px',
    '.footer': {
        listStyle: 'none',
        display: 'flex',
        margin: '0',
        padding: '0',
        flexWrap: 'wrap',
        justifyContent: 'center',
        '&-link': {
            listStyle: 'none',
            margin: '0 1rem',
            padding: '0.25rem 0',
            '&-content': {
                color: '#7D7D7D',
                textDecoration: 'none',
            }
        }
    }
});

export default FooterStyled;
