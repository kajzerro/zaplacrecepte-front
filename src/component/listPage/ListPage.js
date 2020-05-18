import React, {useEffect, useState} from 'react';
import ListRow from '../listRow/ListRow';
import Modal from 'react-bootstrap/Modal'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import axios from 'axios';

function ListPage() {

    const [isLoading, setIsLoading] = useState(false);
    const [prescriptionsData, setPrescriptionsData] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [formFirstName, setFormFirstName] = useState("");
    const [formLastName, setFormLastName] = useState("");
    const [formPesel, setFormPesel] = useState("");
    const [formPostalCode, setFormPostalCode] = useState("");
    const [formRemarks, setFormRemarks] = useState("");
    const [formPhoneNumber, setFormPhoneNumber] = useState("");
    const [formEmail, setFormEmail] = useState("");

    const handleClose = () => setShowModal(false);
    const handleSave = () => {
        axios.post("/api/prescriptions/",
            {
                firstName: formFirstName,
                lastName: formLastName,
                pesel: formPesel,
                postalCode: formPostalCode,
                remarks: formRemarks,
                phoneNumber: formPhoneNumber,
                email : formEmail

            })
            .then(() => {
                fetchData();
                setShowModal(false);
            })
            .catch(err => alert(err));
    };
    const handleShow = () => setShowModal(true);
    const createFirstLastClassName = (collection, index) => {
        if (index === 0) {
            return "first";
        } else if (collection.length - 1 === index) {
            return "last"
        }
        return "";
    };

    function fetchData() {
        setIsLoading(true);
        axios.get("/api/prescriptions/")
            .then(res => {
                setPrescriptionsData(res.data);
            })
            .catch(err => alert(err))
            .finally(() => {
                setIsLoading(false);
            });
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            <div className="patient-list container">
                <div className="row">
                    <div className="offset-1 col-10">
                        <div className="row">
                            <div className="add-person offset-2 col-8">
                                <button type="button" className="btn btn-success btn-block patient-button"
                                        onClick={handleShow}>Dodaj recepte
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                {isLoading &&
                <div className="text-center">
                    <div className="spinner-border" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
                }
                {prescriptionsData.map((row, index) => (
                    <ListRow prescription={row} className={createFirstLastClassName(prescriptionsData, index)}/>
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
                            onChange={e => setFormPesel(e.target.value)}
                            placeholder="PESEL"
                            aria-describedby="inputGroup-sizing-default"
                        />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="inputGroup-sizing-default">Kod pocztowy</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                            onChange={e => setFormPostalCode(e.target.value)}
                            placeholder="Kod pocztowy"
                            aria-describedby="inputGroup-sizing-default"
                        />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="inputGroup-sizing-default">Uwagi/Objawy</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                            onChange={e => setFormRemarks(e.target.value)}
                            placeholder="Uwagi/objawy"
                            aria-describedby="inputGroup-sizing-default"
                        />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="inputGroup-sizing-default">Numer telefonu</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                            onChange={e => setFormPhoneNumber(e.target.value)}
                            placeholder="Numer telefonu"
                            aria-describedby="inputGroup-sizing-default"
                        />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="inputGroup-sizing-default">Email</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                            onChange={e => setFormEmail(e.target.value)}
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
