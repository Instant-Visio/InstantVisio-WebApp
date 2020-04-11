import styled from 'styled-components'
import {SCREEN} from '../../styles/theme'


export const CallContainer = styled.div`
    width: 100vw;
    height: 100%;
    color: ${({theme}) => theme.color.white};
    background: ${({theme}) => theme.color.black};
`

export const IframeContainer = styled.div`
    position: relative;
    background: linear-gradient(to bottom, #506377 0%, #56777f 41%, #5a5147 67%, #232321 100%, #8a5d29 92%), radial-gradient(ellipse at center, #4e5c13 13%, #4a6c75 56%, #e0d4c6 47%, #afafcc 83%, #948e90 87%) !important;
    height: 90%;
    font-size: ${({theme}) => theme.font.L};
    display: flex;
    align-items: center;
    justify-content: center;
    iframe {
        width: 100%;
        height: 100%;
        border: none;
        display: block;   
    }

    .waiting-participant {
        padding: 0 ${({theme}) => theme.spacing.M};
        text-align: center;
        position: absolute;
        left: 0;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
    }

      ${SCREEN.LANDSCAPE} {
        height: 80%;
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
    padding: 0 ${({theme}) => theme.spacing.S};

    ${SCREEN.MOBILE} {
        width: 12rem;
        height: 7rem;
    }

    ${SCREEN.LANDSCAPE} {
        /* width: 126px;
        height: 68px; */
        width: 9rem;
        height: 6rem;
        padding: 0;
    }
`

export const Controls = styled.div`
    padding: 0 ${({theme}) => theme.spacing.XXL};
    width: 100vw;
    height: 10%;
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
        height: 20%;
    }
`