import styled from 'styled-components'

export const MainView = styled.div`
    padding: 2rem 1rem 2rem 1rem;
    background: ${({ theme }) => theme.color.white};
    border: 1px solid #c3cfd9;
    margin: ${({ theme }) => theme.spacing.XXL};

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 772px;
    // min-width: 420px;

    h1 {
        font-size: ${({ theme }) => theme.spacing.L};
        text-align: center;
    }
    h3 {
        margin-bottom: ${({ theme }) => theme.spacing.S};
    }
    .infoContainer > h5:nth-of-type(1) {
        height: 4rem;
        margin-bottom: ${({ theme }) => theme.spacing.XL};
    }
    h5 {
        min-width: 160px;
    }
    p {
        margin-bottom: 0rem;
    }
    .infoContainer {
        // border: 1px solid #c3cfd9; // DEBUG
        text-align: center;
        margin-bottom: ${({ theme }) => theme.spacing.M};
    }
    .listContainer {
        // border: 1px solid #c3cfd9; // DEBUG
    }
    .hidden {
        visibility: hidden;
    }
    .listContainerFree {
        font-size: 1.1rem;
    }
    .subscriptionButton {
        text-decoration: none;
        text-align: center;
    }
`
