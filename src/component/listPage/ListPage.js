import React, {useEffect, useState} from 'react';
import ListRow from './ListRow';
import Modal from 'react-bootstrap/Modal'
import axios from 'axios';
import {getEndpoint, getUserData, isPrescriptionClientType, isServiceClientType, saveUserData} from '../config/Config';
import PrescriptionFields from '../common/PrescriptionFields';
import StatusSelection from './StatusSelection';
import {useHistory} from "react-router-dom";
import moment from 'moment-timezone';
import ZrStatusButton from '../common/ZrStatusButton';
import ZrInput from "../common/ZrInput";
import ZrErrorModal from "../common/ZrErrorModal";
import PrescriptionToolbar from "./PrescriptionToolbar";
import ServiceToolbar from "./ServiceToolbar";
import ChangePasswordModal from "./ChangePasswordModal";

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
    const [errorAlert, setErrorAlert] = useState({
        show: false, onClose: () => {
        }, message: ""
    });
    const [searchPatientQuery, setSearchPatientQuery] = useState("");
    const [showMenu, setShowMenu] = useState(false);
    const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);

    const searchPatientFilter = (patientData) => {
        return searchPatientQuery === "" ||
            patientData.firstName.toUpperCase().includes(searchPatientQuery.toUpperCase()) ||
            patientData.lastName.toUpperCase().includes(searchPatientQuery.toUpperCase()) ||
            patientData.pesel.toUpperCase().includes(searchPatientQuery.toUpperCase());
    };

    const showAlert = (properties) => {
        setErrorAlert({...properties, key: Math.random()});
    };

    const handleClose = () => {
        setShowAddModal(false);
        setShowEditModal(false);
        setCheckAll(false);
    };
    const handleLogout = () => {
        axios.get(getEndpoint() + "/api/logout")
            .finally(() => {
                history.push('/');
                saveUserData({});
            });
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
        const id = setInterval(fetchData, 15 * 1000);
        return () => clearInterval(id);
    }, []);

    let history = useHistory();

    return (
        <>
            <div className="list-page fullscreen">
                <div className="search-header">
                    <div className="container">
                        <div className="row pb-2">
                            <div className="col-3">
                                <img className="to-bottom" src="logo.svg"/>
                            </div>
                            <div className="col-6">
                                <input className="to-bottom" type="text" id="search" name="search"
                                       placeholder="Szukaj pacjenta" value={searchPatientQuery}
                                       onChange={e => setSearchPatientQuery(e.target.value)}/>
                            </div>
                            <div className="col-3">
                                <button className="menu-button to-bottom" onClick={() => setShowMenu(true)}>
                                    <img src="listPage/awatar.png"/>
                                    <span>
                                        {"Dr " + getUserData().firstName + " " + getUserData().lastName}
                                </span>
                                </button>
                                {showMenu &&
                                <>
                                    <div className={"menu"}>
                                        <img className={"big-avatar"} src="listPage/awatar.png"/>
                                        <h4 className={"zr-header"}>
                                            {"Dr " + getUserData().firstName + " " + getUserData().lastName}
                                        </h4>
                                        <div className={"mb-3"}>
                                            <span>{getUserData().email}</span>
                                        </div>
                                        <button className={"log-out"} onClick={() => {
                                            setShowMenu(false);
                                            setShowChangePasswordModal(true);
                                        }}>
                                            Zmień hasło
                                        </button>
                                        <button className={"log-out"} onClick={handleLogout}>
                                            <img src="listPage/logOut.svg"/> Wyloguj się
                                        </button>
                                    </div>
                                    <div className={"menu-background"} onClick={() => setShowMenu(false)}/>
                                </>}
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="container">
                        {isPrescriptionClientType() ?
                            <PrescriptionToolbar action={() => setShowAddModal(true)}/> : null}
                        {isServiceClientType() ? <ServiceToolbar action={() => setShowAddModal(true)}/> : null}
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
                                {isPrescriptionClientType() && "Kod pocztowy"}
                                {isServiceClientType() && "Kwota"}
                            </div>
                            <div className="col-3">
                                Status
                            </div>
                        </div>
                        {prescriptionsData.filter(p => searchPatientFilter(p)).map((row, index) => (
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
                        {isPrescriptionClientType() ? "Nowa recepta" : null}
                        {isServiceClientType() ? "Nowa płatność" : null}
                    </h4></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <PrescriptionFields onChange={setNewPrescriptionData} initData={{}} checkAll={checkAll}
                                        defaultEmailFeature={true} ownerEmailAddress={getUserData().email}/>
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-secondary" onClick={handleClose}>
                        Zamknij
                    </button>
                    <div className="patient-blocking-button half-width-button">
                        <span className={"spinner-border" + (savingInProgress ? "" : "invisible")}/>
                        <button className="btn zr-red-button" onClick={handleAddSave} disabled={savingInProgress}>
                            {isPrescriptionClientType() ? "Zapisz i dodaj recepte" : null}
                            {isServiceClientType() ? "Zapisz i dodaj płatność" : null}
                        </button>
                    </div>
                </Modal.Footer>
            </Modal>
            <Modal show={showEditModal} onHide={handleClose} animation={false}
                   dialogClassName={"list-page-modal edit-prescription"}>
                <Modal.Header>
                    <Modal.Title>
                        {!inRealizationState && <h4 className="zr-header">Szczegóły recepty</h4>}
                        {inRealizationState && <h4 className="zr-header">Realizacja recepty
                            dla: {selectedRowData.firstName} {selectedRowData.lastName}</h4>}
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
                                }}>
                                {isPrescriptionClientType() ? "Zrealizuj receptę" : null}
                                {isServiceClientType() ? "Wyślij receptę" : null}
                            </button>
                            }
                            <StatusSelection onChange={setEditedStatus} initData={selectedRowData.status}/>
                            <ZrStatusButton value={editedStatus}/>
                            <PrescriptionFields onChange={setEditedPrescriptionData} initData={selectedRowData}
                                                copyPeselButton defaultEmailFeature={true}
                                                ownerEmailAddress={getUserData().email}/>
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
                                    {isPrescriptionClientType() ? "Zrealizuj receptę" : null}
                                    {isServiceClientType() ? "Wyślij receptę" : null}
                                </button>
                            </div>
                        </>
                    }
                </Modal.Footer>
            </Modal>
            <ZrErrorModal show={errorAlert.show} onClose={errorAlert.onClose} message={errorAlert.message}
                          key={errorAlert.key} header={"Błąd"}/>
            <ChangePasswordModal show={showChangePasswordModal} showToggle={setShowChangePasswordModal}/>
        </>


    );
}

export default ListPage;
