import styled from 'styled-components';

const Overlay = styled.div<{ $isOpen: boolean }>`
    position: fixed;
    display: none;
    inset: 0 0 0 0;
    z-index: 3;
    background-color: rgba(0, 0, 0, 0.7);
    backdrop-filter: blur(2.5px);

    ${({ $isOpen }) =>
        $isOpen &&
        `
            display: block;
    `}
`;

const StyledModal = styled.div<{ $isOpen: boolean }>`
    display: none;
    position: fixed;
    max-height: 95vh;
    left: 50%;
    top: 50%;
    translate: -50% -50%;
    overflow: hidden auto;
    min-width: 250px;
    max-width: 550px;
    border: 1px solid black;
    z-index: 4;
    background-color: #fff;
    border: none;
    border-radius: 5px;
    padding: 40px 35px 30px;

    ${({ $isOpen }) =>
        $isOpen &&
        `
            display: block;
    `}

    .cancel-btn {
        position: absolute;
        top: 0;
        right: 0;
        padding: 0;
        margin: 10px;

        span {
            color: red;
        }

        span:hover {
            font-variation-settings: 'FILL' 1;
        }
    }

    .confirm-dialog-msg {
        margin: 0;
        margin-bottom: 20px;
    }
`;

export { Overlay, StyledModal };
