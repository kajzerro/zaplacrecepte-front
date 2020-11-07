import React, {useEffect, useState} from 'react';
import Form from "react-bootstrap/Form";
import ZrFooter from '../common/ZrFooter';
import {useParams} from 'react-router-dom'
import axios from "axios";
import {getEndpoint} from "../config/Config";
import ZrInput from "../common/ZrInput";

function PaymentServicePage() {

    const [accepted, setAccepted] = useState(false);
    const [clientData, setClientData] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    let {prescriptionId} = useParams();

    const handlePay = () => {
    };

    function fetchData() {
        axios.get(getEndpoint() + "/api/prescriptions/client/" + prescriptionId)
            .then(res => {
                setClientData(res.data);
                setIsLoading(false);
            })
            .catch(err => {
                alert(err);
            });
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        (!isLoading && clientData && clientData.status !== 'NEW') ?
            <div className="prescription-expired-page">
                <div className="fullscreen">
                    <div className="body-wrapper">
                        <img className={"logo mb-4"} src="/logo.svg"/>
                        <h3 className="zr-header">
                            Płatność została już zrealizowana lub lekarz anulował Twoje zamówienie.
                        </h3>
                        <div className={"zr-header-description"}>
                            W razie pytań prosimy o kontakt z gabinetem.
                        </div>
                    </div>
                    <img src="/prescriptionExpiredPage/bottomImage.svg" className={"bottom-image"}/>
                    <ZrFooter/>
                </div>
            </div>
            :
            <div className="payment-page">
                <div className="fullscreen">
                    <div className={"header"}>
                        <img src="/logo.svg"/>
                    </div>
                    <div className="body-wrapper">
                        <h3 className="zr-header">
                            Opłać usługę
                        </h3>
                        {isLoading ?
                            <div className="row">
                                <div className="col-12 text-center patient-spinner mt-4 mb-4">
                                    <div className="spinner-border" role="status">
                                        <span className="sr-only">Loading...</span>
                                    </div>
                                </div>
                            </div>
                            :
                            <div>
                                <ZrInput
                                    label={"Imię i nazwisko"}
                                    value={clientData.firstName ? clientData.firstName + " " + clientData.lastName : ""}
                                />
                                <ZrInput
                                    label={"Pesel"}
                                    value={clientData.pesel}
                                />
                                <ZrInput
                                    label={"Kod pocztowy"}
                                    value={clientData.postalCode}
                                />
                                <ZrInput
                                    label={"Szegóły usługi"}
                                    value={clientData.remarks}
                                />
                                <ZrInput
                                    label={"Numer telefonu"}
                                    value={clientData.phoneNumber}
                                />
                                <ZrInput
                                    label={clientData.feeIncluded ? "Kwota" : "Kwota (zawiera 3 PLN prowizji)"}
                                    value={clientData.price}
                                >
                                    <div className={"right-aligned-description"}>
                                        PLN
                                    </div>
                                </ZrInput>
                                <Form.Check
                                    className="mb-4 mt-4"
                                    type="checkbox"
                                    id="myid"
                                >
                                    <Form.Check.Input type="checkbox"
                                                      onChange={e => {
                                                          setAccepted(e.target.checked);
                                                      }}/>
                                    <Form.Check.Label className={"declaration"}>Oświadczam, że zapoznałem/am się z <a
                                        href="/regulamin">regulaminem.</a></Form.Check.Label>
                                </Form.Check>
                                <a href={clientData.orderUrl}>
                                    <button className="mb-3 btn btn-block zr-red-button" disabled={!accepted}
                                            onClick={handlePay}>
                                        Akceptuję zamówienie i płacę
                                    </button>
                                </a>
                            </div>}
                    </div>
                    <ZrFooter/>
                </div>
            </div>
    );
}

export default PaymentServicePage;
