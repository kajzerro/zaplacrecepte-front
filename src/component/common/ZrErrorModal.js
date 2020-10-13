import React, {useEffect, useState} from 'react';
import Modal from "react-bootstrap/Modal";

function ZrErrorModal(props) {

    const [show, setShow] = useState(props.show || false);
    const [message, setMessage] = useState(props.message || "");

    function onClose() {
        setShow(false);
        props.onClose();
    }

    useEffect(() => {
        setShow(props.show);
        setMessage(props.message);
    }, [props.show, props.message]);

    return (

        <Modal show={show} onHide={onClose} animation={false}
               dialogClassName={"zr-error-modal"}>
            <Modal.Header>
                <Modal.Title>
                    <h4 className="zr-header">{props.header}</h4>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {message}
            </Modal.Body>
            <Modal.Footer>
                <button className="btn btn-secondary" onClick={onClose}>
                    Zamknij
                </button>
            </Modal.Footer>
        </Modal>
    );
}

export default ZrErrorModal;
