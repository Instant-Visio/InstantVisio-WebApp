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
`

export const MutedCamera = styled.div`
    background: #000000;
    border-radius: ${({theme}) => theme.spacing.XS};
    display: flex;
    justify-content: center;
    align-items: center;
    width: 21rem;
    height: 13rem;
    position: absolute;
    z-index: 10;
    bottom: 2rem;
    left: 1rem;
`

export const Controls = styled.div`
    position: absolute;
    width: 100vw;
    height: 10vh;
    bottom: 0;
    background: white;
    color: black;

    .control {
        cursor: pointer;
        with: fit-content;
    }

    .red {
        color: ${({theme}) => theme.color.red};
    }
`