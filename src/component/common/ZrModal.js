import React, {useState} from 'react';
import Modal from "react-bootstrap/Modal";

function ZrModal(props) {

    const [actionInProgress, setActionInProgress] = useState(false);

    const handleClose = () => {
        props.showToggle(false);
    };

    const handleAction = () => {
        setActionInProgress(true);
        props.actionHandler()
            .then(() => {
                props.showToggle(false);
            })
            .finally(() => {
                setActionInProgress(false);
            });
    };

    return (
        <Modal show={props.show} onHide={handleClose} animation={false} dialogClassName={"list-page-modal"}>
            <Modal.Header closeButton>
                <Modal.Title><h4 className="zr-header">
                    {props.title}
                </h4></Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {props.children}
            </Modal.Body>
            <Modal.Footer>
                <button className="btn btn-secondary" onClick={handleClose}>
                    Zamknij
                </button>
                <div className="patient-blocking-button half-width-button">
                    <span className={"spinner-border" + (actionInProgress ? "" : "invisible")}/>
                    <button className="btn zr-red-button" onClick={handleAction}
                            disabled={props.disabled || actionInProgress}>
                        {props.actionLabel}
                    </button>
                </div>
            </Modal.Footer>
        </Modal>
    );
}

export default ZrModal;
