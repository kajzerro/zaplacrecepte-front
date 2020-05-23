import React, {useEffect, useState} from 'react';
import ListRow from './ListRow';
import Modal from 'react-bootstrap/Modal'
import axios from 'axios';
import {getEndpoint} from '../config/Config';
import PrescriptionFields from './PrescriptionFields';
import StatusSelection from './StatusSelection';

function ListPage() {

    const [isLoading, setIsLoading] = useState(false);
    const [prescriptionsData, setPrescriptionsData] = useState([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [newPrescriptionData, setNewPrescriptionData] = useState({});
    const [editedPrescriptionData, setEditedPrescriptionData] = useState({});
    const [editedStatus, setEditedStatus] = useState("");
    const [selectedRowData, setSelectedRowData] = useState({});

    const handleClose = () => {setShowAddModal(false);
        setShowEditModal(false);};
    const handleAddSave = () => {
        axios.post(getEndpoint() + "/api/prescriptions/",
            newPrescriptionData)
            .then(() => {
                fetchData();
                setShowAddModal(false);
            })
            .catch(err => alert(err));
    };
    const handleEditSave = () => {
        axios.put(getEndpoint() + "/api/prescriptions/" + selectedRowData.id,
            {...editedPrescriptionData, status: editedStatus})
            .then(() => {
                fetchData();
                setShowEditModal(false);
            })
            .catch(err => alert(err));
    };
    const handleEditShow = (data) => {
        setSelectedRowData(data);
        setShowEditModal(true);
    };
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
        axios.get(getEndpoint() + "/api/prescriptions/")
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
                                        onClick={ () => setShowAddModal(true)}>Dodaj recepte
                                </button>
                            </div>
                            {isLoading &&
                            <div className="text-center patient-spinner">
                                <div className="spinner-border" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                            </div>
                            }
                        </div>
                    </div>
                </div>
                {prescriptionsData.map((row, index) => (
                    <ListRow key={row.id} prescription={row} className={createFirstLastClassName(prescriptionsData, index)} onClick={() => {handleEditShow(row)}}/>
                ))}
            </div>
            <Modal show={showAddModal} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Dodawanie recepty</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <PrescriptionFields onChange={setNewPrescriptionData} initData={{}}/>
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-secondary" onClick={handleClose}>
                        Zamknij
                    </button>
                    <button className="btn btn-primary" onClick={handleAddSave}>
                        Zapisz i dodaj recepte
                    </button>
                </Modal.Footer>
            </Modal>
            <Modal show={showEditModal} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Edycja recepty</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <StatusSelection onChange={setEditedStatus} initData={selectedRowData.status}/>
                    <PrescriptionFields onChange={setEditedPrescriptionData} initData={selectedRowData}/>
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-secondary" onClick={handleClose}>
                        Zamknij
                    </button>
                    <button className="btn btn-primary" onClick={handleEditSave}>
                        Zapisz zmiany
                    </button>
                </Modal.Footer>
            </Modal>
        </>


    );
}

export default ListPage;
