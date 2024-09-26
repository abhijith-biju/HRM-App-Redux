import styled from 'styled-components';

const StyledEmpDetailsWrap = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 45px;

    .view-emp-card {
        display: flex;
        border-radius: 5px;
        box-shadow: 0 6px 20px -5px rgba(0, 0, 0);
        overflow: hidden;

        & .primary-employee-details {
            background-color: var(--primary-clr);
            color: #fff;
            width: 350px;
            padding: 30px 20px;
            text-align: center;
            display: flex;
            flex-direction: column;
            justify-content: center;
        }

        & .profile-photo {
            --img-size: 200px;

            height: var(--img-size);
            width: var(--img-size);
            text-align: center;
            line-height: var(--img-size);
            font-size: 1.5em;
            border-radius: 50%;
            border: 5px solid #fff;
            margin-inline: auto;
            margin-bottom: 30px;
            object-fit: cover;
        }

        & .full-name {
            font-size: 2em;
            font-weight: 500;
            margin: 0 0 10px 0;
        }

        & .role,
        & .department,
        & .location {
            font-size: 1.2em;
            margin: 0 0 4px 0;
        }

        & dl.secondary-employee-details {
            margin: 0;
            padding: 30px 20px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            width: 450px;
        }

        & .data-entry {
            margin-bottom: 17px;
        }

        & dt,
        & dd {
            display: block;
            margin: 0;
        }

        & dt {
            font-size: 1em;
            font-weight: 500;
        }

        & dd {
            font-size: 1.2em;
            font-weight: 300;
            color: rgb(43, 42, 42);
            word-wrap: break-word;
        }

        & .selected-skills-list {
            margin: 5px 0 0 0;
            list-style: none;
            padding: 0;
            gap: 8px;
            flex-wrap: wrap;
            max-height: 190px;
            overflow-y: auto;
        }
    }

    .navigation-controls {
        display: flex;
        gap: 20px;

        .edit-emp-btn {
            background-color: var(--edit-clr);

            &:hover {
                background-color: var(--edit-clr-accent);
            }
        }
    }
`;

export default StyledEmpDetailsWrap;
