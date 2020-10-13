import React, {useState} from 'react';
import ZrHeaderMenu from "../common/ZrHeaderMenu";
import ZrFooter from "../common/ZrFooter";
import ZrInput from "../common/ZrInput";
import ZrTextArea from "../common/ZrTextArea";
import axios from "axios";
import {getEndpoint} from "../config/Config";
import ZrErrorModal from "../common/ZrErrorModal";
import * as EmailValidator from "email-validator";

function CooperationPage() {
    const [email, setEmail] = useState("");
    const [emailValid, setEmailValid] = useState(false);
    const [emailChanged, setEmailChanged] = useState(false);
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");
    const [sendingInProgress, setSendingInProgress] = useState("");
    const [alert, setAlert] = useState({
        show: false, onClose: () => {
        }, message: "", header: ""
    });

    const isEmailValid = (input) => {
        return EmailValidator.validate(input);
    };

    const handleSend = () => {
        setSendingInProgress(true);
        axios.post(getEndpoint() + "/api/contact",
            {
                message:
                    "Email: " + email + "\n" +
                    "Temat: " + subject + "\n" +
                    "Treść: " + message + "\n"
            })
            .then(() => {
                showAlert({
                    show: true, onClose: () => {
                    }, header: "Wysłano", message: "Wiadomość została wysłana. Dziękujemy!"
                })
            })
            .catch(err =>
                showAlert({
                    show: true, onClose: () => {
                    }, header: "Błąd", message: "Wystąpił błąd - prosimy o kontakt innym kanałem."
                })
            )
            .finally(() => {
                setSendingInProgress(false);
            });
    };

    const showAlert = (properties) => {
        setAlert({...properties, key: Math.random()});
    };

    return (

        <div className="contact-page container-fluid">
            <div className="row fullscreen">
                <div className="col-6 blue-background">
                    <ZrHeaderMenu/>
                    <div className="row centered-body-wrapper left-site">
                        <div className="col-12">
                            <h1 className="zr-header">Chcesz z nami
                                współpracować?
                                Razem możemy więcej.
                            </h1>
                            <div className="input-frame">
                                <div className="zr-header-description">Napisz do nas lub zadzwoń, czekamy na Ciebie!
                                    <br/>
                                    <br/>
                                    Hastlin BCZ Mateusz Kaszyk<br/>
                                    Leśna 40, 43-100 Tychy, NIP: 6462957215<br/><br/>
                                    605-638-348 (poniedziałek - piątek, 8:00-19:00) <br/>
                                    <a href={"mailto:admin@zaplacrecepte.pl"}>admin@zaplacrecepte.pl</a>
                                    <br/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-6">
                    <div className="row centered-body-wrapper ">
                        <ZrInput
                            label={"Twój adres e-mail"}
                            errorMessage={"Niepoprawny adres e-mail"}
                            placeholder={"Twój adres e-mail"}
                            className="mb-3"
                            value={email}
                            onChange={e => {
                                setEmailValid(isEmailValid(e.target.value));
                                setEmail(e.target.value)
                            }}
                            onBlur={() => setEmailChanged(true)}
                            isInvalid={emailChanged && !emailValid}
                        />
                        <ZrInput
                            className={"mb-3"}
                            label={"Temat"}
                            placeholder={"Temat"}
                            value={subject}
                            onChange={e => {
                                setSubject(e.target.value);
                            }}
                        />
                        <ZrTextArea
                            className={"mb-3"}
                            label={"Treść wiadomości"}
                            placeholder={"Wpisz treść wiadomości"}
                            value={message}
                            onChange={e => {
                                setMessage(e.target.value);
                            }}
                        />
                        <div className="patient-blocking-button half-width-button">
                            <span className={"spinner-border" + (sendingInProgress ? "" : "invisible")}/>
                            <button className="btn zr-red-button" onClick={handleSend}
                                    disabled={sendingInProgress || message === "" || !emailValid}>
                                Wyślij
                            </button>
                        </div>
                    </div>
                </div>
                <img className={"image-on-footer"} src={"/cooporationPage/bottom-image.svg"}/>
                <ZrFooter/>
            </div>
            <ZrErrorModal show={alert.show} onClose={alert.onClose} message={alert.message}
                          key={alert.key} header={alert.header}/>
        </div>
    );
}

export default CooperationPage;
