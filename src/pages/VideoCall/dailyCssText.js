export default `
    .daily-video-toplevel-div {
        position: relative;
    }
    
    .scroll::-webkit-scrollbar {
        display: none;
    }
    
    .daily-video-element {
        object-fit: cover;
    }
    
    .daily-videos-wrapper {
        position: relative;
        display: flex;
        flex-flow: row wrap;
        overflow: hidden;
    }
    
    .daily-video-div {
        position: relative;
        visibility: visible;
        overflow: hidden;
    }

    .daily-video-div.remote.cam-muted::before {
        content: '';
        background: linear-gradient(to bottom, #506377 0%, #56777f 41%, #5a5147 67%, #232321 100%, #8a5d29 92%), radial-gradient(ellipse at center, #4e5c13 13%, #4a6c75 56%, #e0d4c6 47%, #afafcc 83%, #948e90 87%) !important;
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        z-index: 1;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    /** Alone in call **/
    .daily-videos-wrapper.remote-cams-0 > .daily-video-div.local {
        border-radius: 0.5rem;
        width: 17rem;
        height: 10rem;
        position: absolute;
        z-index: 10;
        bottom: 2rem;
        left: 1rem;
    }
    
    /** 2-person call **/
    .daily-videos-wrapper.remote-cams-1 > .daily-video-div.local {
        border-radius: 0.5rem;
        width: 17rem;
        height: 10rem;
        position: absolute;
        z-index: 10;
        bottom: 2rem;
        left: 1rem;
    }

    .daily-videos-wrapper.remote-cams-1 > .daily-video-div.remote {
        height: 100%;
        width: 100%;
    }
    
    /** 3-person call**/
    .daily-videos-wrapper.remote-cams-2 > .daily-video-div.local {
        border-radius: 0;
        width: calc(100%/3);
        height: 100%;
        position: inherit;
        z-index: 10;
        bottom: 0;
        left: 0;
    }

    .daily-videos-wrapper.remote-cams-2 > .daily-video-div.remote:nth-child(2) {
        width: calc(100%/3);
        height: 100%;
    }

    .daily-videos-wrapper.remote-cams-2 > .daily-video-div.remote:nth-child(3) {
        width: calc(100%/3);
        height: 100%;
    }
    
    /** 4-person call**/
    .daily-videos-wrapper.remote-cams-3 > .daily-video-div.local {
        border-radius: 0;
        width: 50%;
        height: 50%;
        position: inherit;
        z-index: 10;
        bottom: 0;
        left: 0;
    }

    .daily-videos-wrapper.remote-cams-3 > .daily-video-div.remote:nth-child(2) {
        width: 50%;
        height: 50%;
    }

    .daily-videos-wrapper.remote-cams-3 > .daily-video-div.remote:nth-child(3) {
        width: 50%;
        height: 50%;
    }

    .daily-videos-wrapper.remote-cams-3 > .daily-video-div.remote:nth-child(4) {
        width: 50%;
        height: 50%;
    }

    @media screen and (min-width: 500px) and (max-height: 500px) {
        .daily-videos-wrapper > .daily-videos-wrapper.remote-cams-0 > .daily-video-div.local {
            width: 9rem;
            height: 6rem;
            border-radius: 0.5rem;
            position: absolute;
            z-index: 10;
            bottom: 2rem;
            left: 1rem;
        }

        .daily-videos-wrapper > .daily-videos-wrapper.remote-cams-1 > .daily-video-div.local {
            width: 9rem;
            height: 6rem;
            border-radius: 0.5rem;
            position: absolute;
            z-index: 10;
            bottom: 2rem;
            left: 1rem;
        }
    }
    
    @media screen and (max-width: 767px) and (min-height: 501px) {
        .daily-videos-wrapper.remote-cams-0 > .daily-video-div.local {
            width: 12rem;
            height: 7rem;
            border-radius: 0.5rem;
            position: absolute;
            z-index: 10;
            bottom: 2rem;
            left: 1rem;
        }
    
        /** 2-person call **/
        .daily-videos-wrapper.remote-cams-1 > .daily-video-div.local {
            width: 12rem;
            height: 7rem;
            border-radius: 0.5rem;
            position: absolute;
            z-index: 10;
            bottom: 2rem;
            left: 1rem;
        }

        .daily-videos-wrapper.remote-cams-1 > .daily-video-div.remote {
            height: 100%;
            width: 100%;
        }
    
        /** 3-person call**/
        .daily-videos-wrapper.remote-cams-2 > .daily-video-div.local {
            border-radius: 0;
            width: 100%;
            height: calc(100%/3);
            position: inherit;
            z-index: 10;
            bottom: 0;
            left: 0;
        }

        .daily-videos-wrapper.remote-cams-2 > .daily-video-div.remote:nth-child(2) {
            width: 100%;
            height: calc(100%/3);
        }

        .daily-videos-wrapper.remote-cams-2 > .daily-video-div.remote:nth-child(3) {
            width: 100%;
            height: calc(100%/3);
        }
    
        /** 4-person call**/
        .daily-videos-wrapper.remote-cams-3 > .daily-video-div.local {
            border-radius: 0;
            width: 50%;
            height: 50%;
            position: inherit;
            z-index: 10;
            bottom: 0;
            left: 0;
        }

        .daily-videos-wrapper.remote-cams-3 > .daily-video-div.remote:nth-child(2) {
            width: 50%;
            height: 50%;
        }

        .daily-videos-wrapper.remote-cams-3 > .daily-video-div.remote:nth-child(3) {
            width: 50%;
            height: 50%;
        }

        .daily-videos-wrapper.remote-cams-3 > .daily-video-div.remote:nth-child(4) {
            width: 50%;
            height: 50%;
        }
    }
`