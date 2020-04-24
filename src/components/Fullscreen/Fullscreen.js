import styled from 'styled-components'

const FullscreenWrapper = styled.div`
    position: absolute;
    z-index: 1;
    color: #ffffff80;
    cursor: pointer;
    right: ${({ theme }) => theme.spacing.XXS};
    top: ${({ theme }) => theme.spacing.XS};
    width: ${({ theme }) => theme.spacing.XXXL};
    height: ${({ theme }) => theme.spacing.XXXL};

    svg {
        width: 100%;
        height: 100%;
    }
`

export default FullscreenWrapper
