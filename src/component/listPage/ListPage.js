import React, {useState} from 'react';
import ListRow from '../listRow/ListRow';
import Modal from 'react-bootstrap/Modal'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'

function ListPage() {

    const [patientData, setPatientData] = useState([
        {name: 'Piotr', surname: 'Krzystyniak', status: 'paid'},
        {name: 'Piotr', surname: 'Kajzer', status: 'unpaid'},
        {name: 'Kubuś', surname: 'Osika', status: 'done'}
    ]);


    const [showModal, setShowModal] = useState(false);
    const [formFirstName, setFormFirstName] = useState("");
    const [formLastName, setFormLastName] = useState("");

    const handleClose = () => setShowModal(false);
    const handleSave = () => {
        setPatientData(patientData.concat({name: formFirstName, surname: formLastName, status: 'unpaid'}));
        setShowModal(false)
    };
    const handleShow = () => setShowModal(true);
    const createFirstLastClassName = (collection, index) => {
        if (index === 0) {
            return "first";
        }
        else if (collection.length - 1 === index) {
            return "last"
        }
        return "";
    };

    return (
        <>
            <div className="patient-list container">
                <div className="row">
                    <div className="offset-1 col-10">
                        <div className="row">
                            <div className="add-person offset-2 col-8">
                                <button type="button" className="btn btn-success btn-block patient-button" onClick={handleShow}>Dodaj recepte
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                {patientData.map((row, index) => (
                    <ListRow name={row.name} surname={row.surname} status={row.status} className={createFirstLastClassName(patientData, index)}/>
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
                            onChange={e => setFormFirstName(e.target.value)}
                            placeholder="Imię pacjenta"
                            aria-describedby="inputGroup-sizing-default"
                        />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="inputGroup-sizing-default">Nazwisko</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                            onChange={e => setFormLastName(e.target.value)}
                            placeholder="Nazwisko pacjenta"
                            aria-describedby="inputGroup-sizing-default"
                        />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="inputGroup-sizing-default">PESEL</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                            placeholder="PESEL"
                            aria-describedby="inputGroup-sizing-default"
                        />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="inputGroup-sizing-default">Kod pocztowy</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                            placeholder="Kod pocztowy"
                            aria-describedby="inputGroup-sizing-default"
                        />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="inputGroup-sizing-default">Uwagi/Objawy</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                            placeholder="Uwagi/objawy"
                            aria-describedby="inputGroup-sizing-default"
                        />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="inputGroup-sizing-default">Numer telefonu</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                            placeholder="Numer telefonu"
                            aria-describedby="inputGroup-sizing-default"
                        />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="inputGroup-sizing-default">Email</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                            placeholder="Email"
                            aria-describedby="inputGroup-sizing-default"
                        />
                    </InputGroup>
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-secondary" onClick={handleClose}>
                        Zamknij
                    </button>
                    <button className="btn btn-primary" onClick={handleSave}>
                        Zapisz i dodaj recepte
                    </button>
                </Modal.Footer>
            </Modal>
        </>


    );
}

export default ListPage;
