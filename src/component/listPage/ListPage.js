import React, {useEffect, useState} from 'react';
import ListRow from './ListRow';
import Modal from 'react-bootstrap/Modal'
import axios from 'axios';
import {getEndpoint} from '../config/Config';
import PrescriptionFields from './PrescriptionFields';
import StatusSelection from './StatusSelection';
import {useHistory} from "react-router-dom";
import moment from 'moment-timezone';
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";

function ListPage() {

    const [isLoading, setIsLoading] = useState(false);
    const [prescriptionsData, setPrescriptionsData] = useState([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [newPrescriptionData, setNewPrescriptionData] = useState({});
    const [editedPrescriptionData, setEditedPrescriptionData] = useState({});
    const [editedStatus, setEditedStatus] = useState("");
    const [selectedRowData, setSelectedRowData] = useState({});
    const [inRealizationState, setInRealizationState] = useState(false);
    const [editedPrescriptionNumber, setEditedPrescriptionNumber] = useState("");

    const handleClose = () => {
        setShowAddModal(false);
        setShowEditModal(false);
    };
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
            {...editedPrescriptionData, status: editedStatus, prescriptionNumber: editedPrescriptionNumber})
            .then(() => {
                fetchData();
                setShowEditModal(false);
            })
            .catch(err => alert(err));
    };
    const handleEditShow = (data) => {
        setInRealizationState(false);
        setSelectedRowData(data);
        setShowEditModal(true);
        setEditedPrescriptionNumber(data.prescriptionNumber);
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

                for (let i = 0; i < res.data.length; i++) {
                    let row = res.data[i];
                    if (row.createDateTime !== null) {
                        row.createDateTime = moment(row.createDateTime);
                    } else {
                        row.createDateTime = moment("2005-05-05T05:05:00+02:00");
                    }
                }
                res.data.sort((a, b) => (a.createDateTime > b.createDateTime) ? -1 : ((b.createDateTime > a.createDateTime) ? 1 : 0));
                console.log(res.data);
                setPrescriptionsData(res.data);
            })
            .catch(err => {
                alert(err);
                history.push('/');
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    useEffect(() => {
        fetchData();
    }, []);

    let history = useHistory();

    return (
        <>
            <div className="patient-list container">
                <div className="row">
                    <div className="offset-1 col-10">
                        <div className="row">
                            <div className="add-person offset-2 col-8">
                                <button type="button" className="btn btn-outline-success btn-block patient-add-button"
                                        onClick={() => setShowAddModal(true)}>Dodaj recepte
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
                <div className="patient-list-table">
                {prescriptionsData.map((row, index) => (
                    <ListRow key={row.id} prescription={row}
                             className={createFirstLastClassName(prescriptionsData, index)} onClick={() => {
                        handleEditShow(row)
                    }}/>
                ))}
                </div>
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
                    {
                        (inRealizationState || selectedRowData.status === "COMPLETED") &&
                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text id="inputGroup-sizing-default">Numer recepty</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                                value={editedPrescriptionNumber}
                                onChange={e => setEditedPrescriptionNumber(e.target.value)}
                                placeholder="Numer recepty"
                                aria-describedby="inputGroup-sizing-default"
                            />
                        </InputGroup>
                    }
                    {
                        !inRealizationState &&
                        <>
                            {selectedRowData.status !== "COMPLETED" &&
                            <button
                                className={"btn btn-block btn-primary mb-3"}
                                onClick={() => {
                                    setInRealizationState(true);
                                    setEditedStatus('COMPLETED');
                                }}>Zrealizuj
                            </button>
                            }
                            <StatusSelection onChange={setEditedStatus} initData={selectedRowData.status}/>
                            <PrescriptionFields onChange={setEditedPrescriptionData} initData={selectedRowData}/>
                        </>
                    }
                </Modal.Body>
                <Modal.Footer>
                    {
                        !inRealizationState &&
                        <button className="btn btn-secondary" onClick={handleClose}>
                            Zamknij
                        </button>
                    }
                    {
                        inRealizationState &&
                        <button className="btn btn-secondary" onClick={() => {
                            setInRealizationState(false)
                        }}>
                            Wstecz
                        </button>
                    }
                    <button className="btn btn-primary" onClick={handleEditSave}>
                        Zapisz zmiany
                    </button>
                </Modal.Footer>
            </Modal>
        </>


    );
}

export default ListPage;
