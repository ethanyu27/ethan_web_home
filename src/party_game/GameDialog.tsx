import Modal from 'react-modal';
import './WordAssassins.css';

export interface GameDialogProps {
    dialogText: string;
    modalOpen: boolean;
    dialogBody?: any;
    hasConfirm?: boolean;
    handleConfirm?: () => void;
    closeModal: () => void;
}

export function GameDialog(props: GameDialogProps) {
    return (
        <Modal isOpen={props.modalOpen} className={"Game-Dialog"}>
            <div className={"Game-Content"}>
                <label className={"Dialog-Label"}>{props.dialogText}</label>
                <br></br>
                {props.dialogBody}
                <div className={"Div-Center"}>
                    {props.hasConfirm && <button className={"Button Confirm-Button"} onClick={() => {
                        props.closeModal();
                        props.handleConfirm?.();
                    }}>Confirm</button>}
                    <button className={"Button"} onClick={() => props.closeModal()}>{props.hasConfirm ? "Cancel" : "Okay"}</button>
                </div>
            </div>
        </Modal>
    )
}

export default GameDialog;