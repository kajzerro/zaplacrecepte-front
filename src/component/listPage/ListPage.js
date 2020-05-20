import React, {useEffect, useState} from 'react';
import ListRow from './ListRow';
import Modal from 'react-bootstrap/Modal'
import axios from 'axios';
import PrescriptionFields from './PrescriptionFields';

function ListPage() {

    const [isLoading, setIsLoading] = useState(false);
    const [prescriptionsData, setPrescriptionsData] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editedPrescriptionData, setEditedPrescriptionData] = useState({});

    const handleClose = () => setShowModal(false);
    const handleSave = () => {
        axios.post("https://api.zaplacrecepte.pl/api/prescriptions/",
            editedPrescriptionData)
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
        axios.get("https://api.zaplacrecepte.pl/api/prescriptions/")
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
                    <PrescriptionFields onChange={setEditedPrescriptionData}></PrescriptionFields>
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
