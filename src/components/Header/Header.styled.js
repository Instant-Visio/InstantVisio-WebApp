import styled from '@emotion/styled'


const HeaderStyled = styled.header({
    backgroundColor:'#323742',
    display: 'flex',
    width: '100vw',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 'calc(10px + 2vmin)',
    textAlign: 'left',
    '.header': {
        display: 'flex',
        '&-baseline': {
            color: '#aaabbd',
            fontWeight: '500',
            '&-content': {
                fontFamily: `'Baloo Thambi 2', cursive`,
                fontSize: '3.5vh',
            }
        }
    },
    '@media screen and (min-width: 300px)': {
        '.header': {
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            '&-baseline-content': {
                margin: '4vh 0',
                textAlign: 'center',
            }
        }
    },
    '@media screen and (min-width: 1024px)' : {
        padding: '0',
        height: '20vh',
        '.header': {
            flexDirection: 'row',
            justifyContent: 'space-between',
            '&-baseline-content': {
                margin: '0',
                textAlign: 'right',
            }
        }
    }
})

export default HeaderStyled
