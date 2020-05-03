import styled from 'styled-components'
import { SCREEN } from '../../styles/theme'

export const CallContainer = styled.div`
    width: 100vw;
    height: 100%;
    color: ${({ theme }) => theme.color.white};
    background: ${({ theme }) => theme.color.black};
`

export const IframeContainer = styled.div`
    position: relative;
    background: linear-gradient(
            to bottom,
            #506377 0%,
            #56777f 41%,
            #5a5147 67%,
            #232321 100%,
            #8a5d29 92%
        ),
        radial-gradient(
            ellipse at center,
            #4e5c13 13%,
            #4a6c75 56%,
            #e0d4c6 47%,
            #afafcc 83%,
            #948e90 87%
        ) !important;
    height: calc(100% - 80px);
    font-size: ${({ theme }) => theme.font.L};
    display: flex;
    align-items: center;
    justify-content: center;
    iframe {
        width: 100%;
        height: 100%;
        border: none;
        display: block;
    }

    .mute-camera {
        background: #000000;
        text-align: center;
        font-size: ${({ theme }) => theme.font.M};
        border-radius: ${({ theme }) => theme.spacing.XS};
        display: flex;
        justify-content: center;
        align-items: center;
        width: 17rem;
        height: 10rem;
        position: absolute;
        z-index: 10;
        bottom: 2rem;
        left: 1rem;
        padding: 0 ${({ theme }) => theme.spacing.S};
    }

    .waiting-participant {
        padding: 0 ${({ theme }) => theme.spacing.M};
        text-align: center;
        position: absolute;
        left: 0;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
    }

    .mute-camera-three {
        border-radius: 0;
        width: calc(100% / 3);
        height: 100%;
        bottom: 0;
        left: 0;
    }

    .mute-camera-four {
        border-radius: 0;
        width: 50% !important;
        height: 50% !important;
        top: 0;
        left: 0;
    }

    ${SCREEN.MOBILE} and (min-height: 501px) {
        .mute-camera {
            width: 160px;
            height: 110px;
        }

        .mute-camera-three {
            border-radius: 0;
            width: 100%;
            height: calc(100% / 3);
            top: 0;
            left: 0;
        }
    }

    ${SCREEN.LANDSCAPE} {
        height: 80%;

        .mute-camera-three {
            border-radius: 0;
            width: calc(100% / 3);
            height: 100%;
            bottom: 0;
            left: 0;
        }

        .mute-camera-two {
            width: 162px;
            height: 121px;
        }

        .waiting-participant {
            top: ${({ theme }) => theme.spacing.XXXL};
            transform: inherit;
        }
    }
`

export const ControlsContainer = styled.div`
    padding: 0 ${({ theme }) => theme.spacing.XXL};
    width: 100vw;
    height: 80px;
    background: white;
    color: black;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    .controlContainer {
        display: flex;
        flex-direction: row;
    }

    .control {
        cursor: pointer;
        width: 70px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 16px;
        border-radius: 4px;
        transition: all 200ms ease-in-out;
    }

    .control:hover {
        background: #eee;
    }

    .control:focus,
    .control:active {
        background: #aaa;
    }

    .loader {
        margin: 0 auto;
    }

    svg {
        margin-bottom: ${({ theme }) => theme.font.XXS};
    }

    p {
        margin: 0;
        font-size: ${({ theme }) => theme.font.S};
    }

    .green {
        color: ${({ theme }) => theme.color.green};
    }

    .red {
        color: ${({ theme }) => theme.color.red};
    }

    ${SCREEN.MOBILE} {
        padding: 0 ${({ theme }) => theme.spacing.S};
    }
`
