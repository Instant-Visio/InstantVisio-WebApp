import styled from 'styled-components'
import {SCREEN} from '../../styles/theme'


export const IframeStyled = styled.div`
    background: linear-gradient(to bottom, #506377 0%, #56777f 41%, #5a5147 67%, #232321 100%, #8a5d29 92%), radial-gradient(ellipse at center, #4e5c13 13%, #4a6c75 56%, #e0d4c6 47%, #afafcc 83%, #948e90 87%) !important;
    width: 100vw;
    height: 90vh;
    position: relative;
    color: ${({theme}) => theme.color.white};
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: ${({theme}) => theme.font.L};
    iframe {
        width: 100%;
        height: 100%;
        border: none;   
    }

    .waiting-participant {
        position: absolute;
        text-align: center;
        padding: 0 ${({theme}) => theme.spacing.M};
    }

    /* ${SCREEN.MOBILE} and (orientation: portrait) {
        .landscape {
          transform: rotate(-90deg);
          transform-origin: left top;
          width: 100vh;
          height: 100vw;
          overflow-x: hidden;
          position: absolute;
          top: 100%;
          left: 0;
        }
      } */

      ${SCREEN.LANDSCAPE} {
        height: 85vh;
    }
`

export const MutedCamera = styled.div`
    background: #000000;
    text-align: center;
    font-size: ${({theme}) => theme.font.M};
    border-radius: ${({theme}) => theme.spacing.XS};
    display: flex;
    justify-content: center;
    align-items: center;
    width: 17rem;
    height: 10rem;
    position: absolute;
    z-index: 10;
    bottom: 2rem;
    left: 1rem;

    ${SCREEN.MOBILE} {
        width: 12rem;
        height: 7rem;
    }
`

export const Controls = styled.div`
    position: absolute;
    padding: 0 ${({theme}) => theme.spacing.XXL};
    width: 100vw;
    height: 10vh;
    bottom: 0;
    background: white;
    color: black;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    .cam-audio {
        display: flex;
        flex-direction: row;
    }

    .control {
        cursor: pointer;
        width: fit-content;
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin-right: ${({theme}) => theme.spacing.XXXL}
    }

    img {
        margin-bottom: ${({theme}) => theme.font.XXS}
    }

    p {
        margin: 0;
        font-size: ${({theme}) => theme.font.S}
    }

    .black {
        color: ${({theme}) => theme.color.black};
    }

    .red {
        color: ${({theme}) => theme.color.red};
    }

    .leave {
        margin-right: 0;
    }

    ${SCREEN.LANDSCAPE} {
        height: 15vh;
    }
`