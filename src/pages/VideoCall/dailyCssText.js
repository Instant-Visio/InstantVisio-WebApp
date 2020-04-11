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
        flex-direction: column;
        overflow-x: auto;
        -ms-overflow-style: -ms-autohiding-scrollbar;
    }
    
    .daily-video-div {
        position: relative;
        visibility: visible;
        overflow: hidden;
    }
    
    /** Alone in call **/
    .daily-video-div.local, .daily-video-div.screen {
        border-radius: 0.5rem;
        width: 17rem;
        height: 10rem;
        position: absolute;
        z-index: 10;
        bottom: 2rem;
        left: 1rem;
    }
    
    /** 2-person call **/
    .daily-videos-wrapper.remote-cams-1 > .daily-video-div.remote {
        height: 100%;
    }
    
    /** 3-person call**/
    .daily-videos-wrapper.remote-cams-2 > .daily-video-div.remote:nth-child(2) {
    }
    
    .daily-videos-wrapper.remote-cams-2 > .daily-video-div.remote:nth-child(3) {
    }
    
    /** 4-person call**/
    .daily-videos-wrapper.remote-cams-3 > .daily-video-div.remote:nth-child(2) {
    }
    
    .daily-videos-wrapper.remote-cams-3 > .daily-video-div.remote:nth-child(3) {
    }
    
    .daily-videos-wrapper.remote-cams-3 > .daily-video-div.remote:nth-child(4) {
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

    @media screen and (min-width: 500px) and (max-height: 500px) {
        .daily-video-div.local, .daily-video-div.screen {
            width: 9rem;
            height: 5rem;
        }
    }
    
    @media screen and (max-width: 767px) {
        .daily-video-div.local, .daily-video-div.screen {
            width: 12rem;
            height: 7rem;
        }

        .daily-videos-wrapper {
            
        }
    
        /** 2-person call **/
        .daily-videos-wrapper.remote-cams-1 > .daily-video-div.remote {
        }
    
        /** 3-person call**/
        .daily-videos-wrapper.remote-cams-2 > .daily-video-div.remote:nth-child(2) {
        }
    
        .daily-videos-wrapper.remote-cams-2 > .daily-video-div.remote:nth-child(3) {
        }
    
        /** 4-person call**/
        .daily-videos-wrapper.remote-cams-3 > .daily-video-div.remote:nth-child(2) {
        }
    
        .daily-videos-wrapper.remote-cams-3 > .daily-video-div.remote:nth-child(3) {
        }
    
        .daily-videos-wrapper.remote-cams-3 > .daily-video-div.remote:nth-child(4) {
        }
    }
`