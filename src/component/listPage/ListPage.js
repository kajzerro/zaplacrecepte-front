import React, { useState } from 'react';
import ListRow from '../listRow/ListRow';
import Modal from 'react-bootstrap/Modal'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'

function ListPage() {

    const [patientData, setPatientData] = useState([
        {name: 'Piotr', status: 'paid'},
        {name: 'Piotr', status: 'unpaid'},
        {name: 'Piotr', status: 'done'},
    ]);


    const [showModal, setShowModal] = useState(false);
    const [formName, setFormName] = useState("");

    const handleClose = () => setShowModal(false);
    const handleSave = () => {
        setPatientData(patientData.concat({name: formName, status: 'unpaid'}));
        setShowModal(false)};
    const handleShow = () => setShowModal(true);

    return (
        <>
            <div className="patient-list container">
                <div className="row">
                    <div className="add-person offset-10 col-2">
                        <button type="button" className="btn btn-success btn-block" onClick={handleShow}>Dodaj recepte</button>
                    </div>
                </div>
                {patientData.map(row => (
                    <ListRow name={row.name} status={row.status}/>
                ))}

            </div>
            <Modal show={showModal} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Dodawanie recepty</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="inputGroup-sizing-default">Imię</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                            onChange={e => setFormName(e.target.value)}
                            placeholder="Recipient's username"
                            aria-describedby="inputGroup-sizing-default"
                        />
                    </InputGroup>
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-secondary" onClick={handleClose}>
                        Close
                    </button>
                    <button className="btn btn-primary" onClick={handleSave}>
                        Save Changes
                    </button>
                </Modal.Footer>
            </Modal>
        </>


    );
}

export default ListPage;
