import styled from 'styled-components';

const StyledEmployeeDeleteModal = styled.div`
    .confirm-dialog-heading {
        font-size: 1.5em;
        margin: 15px 0;
    }

    .confirm-dialog-msg {
        font-size: 1.2em;
    }

    form {
        display: flex;
        gap: 10px;
    }

    .confirm-dialog-actions {
        display: flex;
        gap: 10px;
        justify-content: right;
    }
`;

export default StyledEmployeeDeleteModal;
