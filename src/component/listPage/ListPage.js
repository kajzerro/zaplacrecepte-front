import React, {useEffect, useState} from 'react';
import ListRow from './ListRow';
import Modal from 'react-bootstrap/Modal'
import axios from 'axios';
import {getEndpoint} from '../config/Config';
import PrescriptionFields from '../common/PrescriptionFields';
import StatusSelection from './StatusSelection';
import {useHistory} from "react-router-dom";
import moment from 'moment-timezone';
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";

function ListPage() {

    const [isLoading, setIsLoading] = useState(false);
    const [savingInProgress, setSavingInProgress] = useState(false);
    const [prescriptionsData, setPrescriptionsData] = useState([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [newPrescriptionData, setNewPrescriptionData] = useState({});
    const [editedPrescriptionData, setEditedPrescriptionData] = useState({});
    const [editedStatus, setEditedStatus] = useState("");
    const [selectedRowData, setSelectedRowData] = useState({});
    const [inRealizationState, setInRealizationState] = useState(false);
    const [editedPrescriptionNumber, setEditedPrescriptionNumber] = useState("");
    const [checkAll, setCheckAll] = useState(false);

    const handleClose = () => {
        setShowAddModal(false);
        setShowEditModal(false);
        setCheckAll(false);
    };
    const handleAddSave = () => {
        if (newPrescriptionData.allValid) {
            setSavingInProgress(true);
            axios.post(getEndpoint() + "/api/prescriptions/",
                newPrescriptionData)
                .then(() => {
                    fetchData();
                    setShowAddModal(false);
                })
                .catch(err => alert(err))
                .finally(() => {
                    setSavingInProgress(false);
                    setCheckAll(false);
                });
        } else {
            setCheckAll(true);
        }
    };
    const handleEditSave = () => {
        setSavingInProgress(true);
        axios.put(getEndpoint() + "/api/prescriptions/" + selectedRowData.id,
            {...editedPrescriptionData, status: editedStatus, prescriptionNumber: editedPrescriptionNumber})
            .then(() => {
                fetchData();
                setShowEditModal(false);
            })
            .catch(err => alert(err))
            .finally(() => {
                setSavingInProgress(false);
            });
    };
    const handleEditShow = (data) => {
        setInRealizationState(false);
        setSelectedRowData(data);
        setShowEditModal(true);
        setEditedPrescriptionNumber(data.prescriptionNumber);
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
        const id = setInterval(fetchData, 60 * 1000);
        return () => clearInterval(id);
    }, []);

    let history = useHistory();

    return (
        <>
            <div>
                <div className="search-header">
                    <div className="container">
                        <div className="row pb-2">
                            <div className="col-3">
                                <img className="to-bottom" src="logo.svg"/>
                            </div>
                            <div className="col-6">
                                <input className="to-bottom" type="text" id="search" name="search"
                                       placeholder="Szukaj pacjenta"/>
                            </div>
                            <div className="col-3">
                                <button className="to-bottom">
                                    <img src="listPage/awatar.png"/>
                                    <span>
                                Dr. Hugh House
                                </span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="list-page">
                    <div className="container">
                        <div className="row mb-5">
                            <div className="col-5 mt-2">
                                <h2 className="zr-header">
                                    Recepty
                                </h2>
                                <div className="zr-header-description">
                                    Sprawdź status oraz szczegóły wystawionych recept
                                </div>
                            </div>
                            <div className="col-7">
                                <div className="container-fluid functional-top">
                                    <div className="row">
                                        <div className="col-3">
                                            <div className="select">
                                    <span>
                                    Lista
                                    </span>
                                            </div>
                                        </div>
                                        <div className="col-4">
                                            <div className="select">
                                    <span>
                                    Sortowanie
                                    </span>
                                            </div>
                                        </div>
                                        <div className="col-5">
                                            <button type="button"
                                                    className="btn btn-block zr-red-button"
                                                    onClick={() => setShowAddModal(true)}>+&nbsp;&nbsp;Wystaw recepte
                                            </button>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className="row table-header">
                            <div className="col-2">
                                Data
                            </div>
                            <div className="col-3">
                                Imię i nazwisko
                            </div>
                            <div className="col-2">
                                Pesel
                            </div>
                            <div className="col-2">
                                Kod pocztowy
                            </div>
                            <div className="col-3">
                                Status
                            </div>
                        </div>
                        {prescriptionsData.map((row, index) => (
                            <ListRow key={row.id} prescription={row} onClick={() => {
                                handleEditShow(row)
                            }}/>
                        ))}

                        {isLoading &&
                        <div className="row">
                            <div className="col-12 text-center patient-spinner mt-4 mb-4">
                                <div className="spinner-border" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                            </div>
                        </div>
                        }

                        <div className="login-footer">
                            All rights reserved © copyright www.zaplacrecepte.pl 2020
                        </div>
                    </div>

                </div>
            </div>
            <Modal show={showAddModal} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Dodawanie recepty</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <PrescriptionFields onChange={setNewPrescriptionData} initData={{}} checkAll={checkAll}/>
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-secondary" onClick={handleClose}>
                        Zamknij
                    </button>
                    <div className="patient-blocking-button">
                        <span className={"spinner-border" + (savingInProgress ? "" : "invisible")}/>
                        <button className="btn btn-primary" onClick={handleAddSave} disabled={savingInProgress}>
                            Zapisz i dodaj recepte
                        </button>
                    </div>
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
                            <PrescriptionFields onChange={setEditedPrescriptionData} initData={selectedRowData}
                                                copyPeselButton/>
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
