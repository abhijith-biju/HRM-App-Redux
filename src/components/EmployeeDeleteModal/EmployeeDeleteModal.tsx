import StyledEmployeeDeleteModal from './EmployeeDeleteModal.style';
import { Button } from '..';
import { useState } from 'react';

interface IEmployeeDeleteModal {
    confirmClickHandler: () => void;
    cancelClickHandler: () => void;
    employeeIdToDelete?: number;
}

const EmployeeDeleteModal: React.FC<IEmployeeDeleteModal> = ({
    confirmClickHandler,
    cancelClickHandler,
    employeeIdToDelete,
}) => {
    const [inputEmpId, setInputEmpId] = useState('');

    const isEmpIdEqual = employeeIdToDelete === Number(inputEmpId);

    return (
        <StyledEmployeeDeleteModal>
            <h2 className="confirm-dialog-heading">Delete Employee</h2>
            <p className="confirm-dialog-msg">
                To confirm the deletion of this employee, please enter their ID
                in the field below.
            </p>
            <form
                action=""
                onSubmit={(e) => {
                    e.preventDefault();
                    confirmClickHandler();
                }}
            >
                <input
                    type="text"
                    value={inputEmpId}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                        setInputEmpId(event.target.value)
                    }
                />
                <div className="confirm-dialog-actions">
                    <Button
                        type="submit"
                        className="primary"
                        disabled={!isEmpIdEqual}
                    >
                        Delete
                    </Button>
                    <Button
                        className="outline"
                        onClick={() => {
                            setInputEmpId('');
                            cancelClickHandler();
                        }}
                    >
                        Cancel
                    </Button>
                </div>
            </form>
        </StyledEmployeeDeleteModal>
    );
};

export default EmployeeDeleteModal;
