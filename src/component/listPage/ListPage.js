import React, {useEffect, useState} from 'react';
import ListRow from './ListRow';
import Modal from 'react-bootstrap/Modal'
import axios from 'axios';
import {getEndpoint} from '../config/Config';
import PrescriptionFields from '../common/PrescriptionFields';
import ZrCheckbox from '../common/ZrCheckbox';
import StatusSelection from './StatusSelection';
import {useHistory} from "react-router-dom";
import moment from 'moment-timezone';
import ZrStatusButton from '../common/ZrStatusButton';
import ZrInput from "../common/ZrInput";
import ZrErrorModal from "../common/ZrErrorModal";

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
    const [useDefaultEmail, setUseDefaultEmail] = useState(true);
    const [errorAlert, setErrorAlert] = useState({
        show: false, onClose: () => {
        }, message: ""
    });

    const showAlert = (properties) => {
        setErrorAlert({...properties, key: Math.random()});
    };

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
                .catch(err =>
                    showAlert({
                        show: true, onClose: () => {
                        }, message: "Wystąpił błąd zapisu - skontaktuj się z administratorem."
                    })
                )
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
            .catch(err =>
                showAlert({
                    show: true, onClose: () => {
                    }, message: "Wystąpił błąd zapisu - skontaktuj się z administratorem."
                })
            )
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
                showAlert({
                    show: true,
                    onClose: () => history.push('/'),
                    message: "Aby wyświetlić strone należy się zalogować"
                });
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
            <div className="list-page">
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
                                Dr Krzystyniak
                                </span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
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
                                            {/*        <div className="select">*/}
                                            {/*<span>*/}
                                            {/*Lista*/}
                                            {/*</span>*/}
                                            {/*        </div>*/}
                                        </div>
                                        <div className="col-4">
                                            {/*        <div className="select">*/}
                                            {/*<span>*/}
                                            {/*Sortowanie*/}
                                            {/*</span>*/}
                                            {/*        </div>*/}
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
            <Modal show={showAddModal} onHide={handleClose} animation={false} dialogClassName={"list-page-modal"}>
                <Modal.Header closeButton>
                    <Modal.Title><h4 className="zr-header">
                        Recepty
                    </h4></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <PrescriptionFields onChange={setNewPrescriptionData} initData={{}} checkAll={checkAll}
                                        useDefaultEmail={useDefaultEmail}/>
                    <ZrCheckbox label="Użyj domyślnego adresu e-mail" onChange={setUseDefaultEmail}
                                initValue={useDefaultEmail}/>
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-secondary" onClick={handleClose}>
                        Zamknij
                    </button>
                    <div className="patient-blocking-button half-width-button">
                        <span className={"spinner-border" + (savingInProgress ? "" : "invisible")}/>
                        <button className="btn zr-red-button" onClick={handleAddSave} disabled={savingInProgress}>
                            Zapisz i dodaj recepte
                        </button>
                    </div>
                </Modal.Footer>
            </Modal>
            <Modal show={showEditModal} onHide={handleClose} animation={false}
                   dialogClassName={"list-page-modal edit-prescription"}>
                <Modal.Header>
                    <Modal.Title>
                        {!inRealizationState && <h4 className="zr-header">Szczegóły recepty</h4>}
                        {inRealizationState && <h4 className="zr-header">Realizacja recepty</h4>}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {
                        (inRealizationState || selectedRowData.status === "COMPLETED") &&
                        <ZrInput
                            label={"Kod recepty"}
                            placeholder={"Kod wystawionej recepty"}
                            className="mb-3"
                            value={editedPrescriptionNumber}
                            onChange={e => setEditedPrescriptionNumber(e.target.value)}
                        />
                    }
                    {
                        !inRealizationState &&
                        <>
                            {selectedRowData.status !== "COMPLETED" &&
                            <button
                                className={"btn btn-block zr-blue-button mb-3"}
                                onClick={() => {
                                    setInRealizationState(true);
                                    setEditedStatus('COMPLETED');
                                }}>Zrealizuj receptę
                            </button>
                            }
                            <StatusSelection onChange={setEditedStatus} initData={selectedRowData.status}/>
                            <ZrStatusButton value={editedStatus}/>
                            <PrescriptionFields onChange={setEditedPrescriptionData} initData={selectedRowData}
                                                copyPeselButton/>
                        </>
                    }
                </Modal.Body>
                <Modal.Footer>
                    {
                        !inRealizationState &&
                        <>
                            <button className="btn btn-secondary" onClick={handleClose}>
                                Zamknij
                            </button>
                            <div className="patient-blocking-button half-width-button">
                                <span className={"spinner-border" + (savingInProgress ? "" : "invisible")}/>
                                <button className="btn zr-red-button" onClick={handleEditSave}
                                        disabled={savingInProgress}>
                                    Zapisz zmiany
                                </button>
                            </div>
                        </>
                    }
                    {
                        inRealizationState &&
                        <>
                            <button className="btn btn-secondary" onClick={() => {
                                setInRealizationState(false)
                            }}>
                                Wstecz
                            </button>
                            <div className="patient-blocking-button half-width-button">
                                <span className={"spinner-border" + (savingInProgress ? "" : "invisible")}/>
                                <button className="btn zr-blue-button" onClick={handleEditSave}
                                        disabled={savingInProgress}>
                                    Zrealizuj receptę
                                </button>
                            </div>
                        </>
                    }
                </Modal.Footer>
            </Modal>
            <ZrErrorModal show={errorAlert.show} onClose={errorAlert.onClose} message={errorAlert.message}
                          key={errorAlert.key}/>
        </>


    );
}

export default ListPage;
