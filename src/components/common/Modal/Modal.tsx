import { Overlay, StyledModal } from './Modal.style';
import { Button } from '../..';

interface IModal {
    children: JSX.Element;
    $isOpen: boolean;
    cancelClickHandler?: () => void;
}

const Modal: React.FC<IModal> = ({
    children,
    $isOpen = false,
    cancelClickHandler,
}) => {
    return (
        <>
            <Overlay $isOpen={$isOpen} />
            <StyledModal $isOpen={$isOpen}>
                <Button onClick={cancelClickHandler} className="cancel-btn">
                    <span className="material-symbols-rounded">
                        disabled_by_default
                    </span>
                </Button>
                {children}
            </StyledModal>
        </>
    );
};

export default Modal;
